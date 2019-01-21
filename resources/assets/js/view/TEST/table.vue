<template>
    <div>
        <el-table border :data="reversedData" @filter-change="handlerFilter" @sort-change="handlerSort"
                  @selection-change="handleSelectionChange" v-loading="loading" size="mini">
            <el-table-column v-if="checkbox" type="selection" width="55"></el-table-column>
            <template v-for="(item,key) in columns">
                <el-table-column
                    :key="key"
                    :ref="'col-'+item.prop"
                    :width="item.width?item.width:null"
                    :prop="item.prop"
                    :column-key="item.prop"
                    :label="item.label"
                    :sortable="item.sort?'custom':false"
                    :filters="item.filter?item.filter.data:null"
                    :filter-multiple="item.filter?(item.filter.multiple===false?item.filter.multiple:true):true"
                >
                    <template slot-scope="scope">
                        <template v-if="('tools' in item)">
                            <Tools :buttons="item.tools" :row="scope.row" :index="scope.$index" v-on:listen-tools="Listeners"></Tools>
                        </template>
                        <template v-else-if="('render' in item)" >
                            <span>ii</span>
                            <component :row="scope.row" v-bind:is="'my-column-'+item.prop"></component>
                        </template>
                        <template v-else-if="('slot' in item)" >
                            <component :row="scope.row" v-bind:is="'my-column-'+item.prop"></component>
                        </template>
                        <template v-else>
                            <fold-prefix v-if="('lazy' in item)" :level="scope.row.tree_level?scope.row.tree_level:0"></fold-prefix>
                            <Fold v-if="('lazy' in item) && scope.row.children_count>0"
                                    v-on:expanding="expanding"
                                    v-on:collapsing="collapsing"
                                    :status="scope.row.tree_fold"
                                    :row="scope.row">
                            </Fold>
                            {{item.convert?scope.row[item.prop+'_text']:scope.row[item.prop]}}
                        </template>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <el-pagination v-if="page"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="filterValue.limit"
                :current-page="filterValue.page"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    // 引入tools
    import Vue from 'vue'
    import Tools from './tools';
    import Fold from './fold';
    import request from '../../utils/axios';
    const ChildrenField = 'tree_children'
    export default {
        props:{
            url: String,
            columns:Array,
            page:{
                type: Boolean,
                default: true
            },
            checkbox:{
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                loading:false,
                data:null,
                selection:null,
                filterValue: {
                    where: {},
                    page: 1,
                    limit: 10,
                    search:'',
                    orderBy: 'id,asc'
                },
                total:0
            }
        },
        components:{ Tools,Fold },
        created:function(){
            // 生成动态组件
            for (var x in this.columns) {
                if ('render' in this.columns[x]){
                    const render = this.columns[x].render;
                    Vue.component(
                        'my-column-'+this.columns[x].prop,
                        {
                            functional:true,
                            render:(h, params)=>{
                                return render(h,params.props)
                            }
                        }
                    );
                }
            }
            // 展开列根据层级加上空格
            Vue.component('fold-prefix', {
                render: function (createElement) {
                    return createElement('span',{style: {paddingLeft: (this.level*2)+'em'}})
                },
                props: {level: {type: Number,required: true}}
            })
            this.renderTable();
        },

        methods: {
            // 展开
            expanding:function(row){
                row.tree_fold = 'loading';
                this.$emit('children',row);
            },
            // 收起
            collapsing:function(row){
                row.tree_fold = 'close';
                this.setChildren(row,null);
            },
            // 监听Tool事件，抛出到上层处理
            Listeners: function (type,index,row) {
                this.$emit('tools',type,index,row)
            },
            // 表头筛选项
            handlerFilter(_filters) {
                for (let key in _filters) {
                    if (_filters[key] == null || _filters[key].length == 0) {
                        delete this.filterValue.where[key];
                    } else {
                        if (_filters[key].length == 1) {
                            this.filterValue.where[key] = _filters[key][0];
                        } else {
                            this.filterValue.where[key] = _filters[key];
                        }
                    }
                }
                this.renderTable();
            },
            // 排序
            handlerSort(obj) {
                if (obj.order == null) {
                    this.filterValue.orderBy = null;
                } else {
                    this.filterValue.orderBy = obj.prop + ',' + obj.order.slice(0, -6);
                }
                this.renderTable();
            },
            // 页数大小改变
            handleSizeChange(pageSize){
                this.filterValue.limit = pageSize;
                this.renderTable();
            },
            // 跳页
            handleCurrentChange(page){
                this.filterValue.page = page;
                this.renderTable();
            },
            // 复选框操作
            handleSelectionChange(selection){
               this.selection = selection;
               this.$emit('SelectionChange',selection)
            },
            // 重载表格数据
            renderTable(){
                console.log(this.filterValue)
                this.loading = true;
                if (!this.page){
                    delete this.filterValue.page;
                    delete this.filterValue.limit;
                }
                request({
                    url:this.url,
                    method: 'get',
                    params: this.filterValue
                }).then((res) => {
                    this.total = res.data.count;
                    this.data = res.data.data;
                    this.loading = false;
                })
                .catch((error) => {
                    this.loading = false;
                    console.log(error);
                });
            },
            // 删除行
            deleteRow(index) {
                this.data.splice(index, 1);
            },
            // 设置列表树子数据
            setChildren(row,children){
                //this.handleSetTree(this.data,row.id,children);
                let path = row.tree_path;
                let data = this.data;
                for (let i =0;i<path.length;i++){
                    if(i==0){
                        data = data[path[i]];
                    }else{
                        data = data[ChildrenField][path[i]];
                    }
                }
                if(row.tree_fold == 'loading'){
                    row.tree_fold = 'open';
                }
                this.$set(data,'tree_fold',row.tree_fold);
                this.$set(data,ChildrenField,children)
            },
        },
        computed: {
            // 根据树形结构渲染为list结构
            reversedData: function () {
                let data = this.data;
                data = getChildren(data,[],0);
                return data;
            }
        },
    }

    // 递归计算list结构
    function getChildren(data,path,level){
        let return_data = [];
        for (var x in data){
            data[x]['tree_level'] = level;
            path[level] = x;
            path.length = level+1;
            data[x]['tree_path'] = path;
            let item = JSON.parse(JSON.stringify(data[x]));
            delete item[ChildrenField];
            return_data.push(item);
            if (ChildrenField in data[x]){
                let children = getChildren(data[x][ChildrenField],path,level+1);
                return_data = return_data.concat(children);
            }
        }
        return return_data;
    }
</script>

<style scoped>
    .el-pagination{
        float: right;
        margin-top: 8px;
    }
</style>

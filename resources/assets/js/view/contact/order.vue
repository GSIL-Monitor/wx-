<template>
    <div>
        <div style="margin: 8px 0">
            <el-row>
             <el-col :span="14">
                 过滤数据:  <el-select @change="handleChange" v-model="Selection">
                        <el-option  v-for="item in options"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="10">
                    <el-input placeholder="请输入要搜索的内容..." size="small" v-model="search.value" class="input-with-select">
                        <el-select style="width: 110px;" size="small" v-model="search.field" slot="prepend"
                                   placeholder="请选择">
                            <el-option v-for="item in columns" :key="item.prop" v-if="item.search" :label="item.label"
                                       :value="item.prop"></el-option>
                        </el-select>
                        <el-button size="small" slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <Table ref="table" :url="url" :columns="columns" :checkbox="false" v-on:tools="handleTools"></Table>

        <el-dialog title="备注信息" :visible.sync="dialog" width="50%" center>
            <el-input style="width: 70%" v-model="remark" placeholder="输入备注信息"></el-input>
            <el-button type="primary" @click="ok">确 定</el-button>
        </el-dialog>
    </div>
</template>

<script>
    import Table from "../../components/public/table";
    import list_page from "../../mixins/list_page";
    import {orderEdit} from "@/api/contact"

    export default {
        components: {Table},
        mixins: [list_page],
        data() {
            return {
                page_name: '预约',
                url: 'order',
                dialog: false,
                columns: [
                    {
                        prop: 'id',
                        label: 'ID',
                        sort: true,
                        width: '80'
                    },
                    {
                        prop: 'company',
                        label: '公司名称',
                        search: true,
                    },
                    {
                        prop: 'name',
                        label: '联系人',
                        search: true,
                    },
                    {
                        prop: 'phone',
                        label: '联系电话',
                        search: true,
                        width:100
                    },
                    {
                        prop: 'status',
                        label: '处理状态',
                        width: '160',
                        filter:{            // 是否可筛选,不需要筛选则不填此属性
                            multiple: false,                     // 是否可多选，默认为true
                            data:[
                                {   value: '0',
                                    text: '未处理',
                                },
                                {   value: '1',
                                    text: '处理中',
                                },
                                {   value: '2',
                                    text: '已处理',
                                },
                                {   value: '3',
                                    text: '无效信息',
                                },
                            ]       // 下拉数据数组,filter存在则必选，getConfigArray('sex') 函数参考 config/sys_config.js
                        },
                        render:{
                            props: {
                                row: Object         // 接受当前行参数
                            },
                            render: function(h) {
                                return h('el-select', {
                                        props:{
                                            value: this.row.status,
                                            size:'small',
                                            placeholder:'标记处理状态'
                                        },
                                        on: {
                                            'change':(event) => {
                                                this.row.status = event;
                                                orderEdit(this.row.id,{status:event})
                                            }
                                        },
                                    },
                                    [
                                        h('el-option',{props: {value: 0,label:'未处理'}}),
                                        h('el-option',{props: {value: 1,label:'处理中'}}),
                                        h('el-option',{props: {value: 2,label:'已处理'}}),
                                        h('el-option',{props: {value: 3,label:'无效信息'}}),
                                    ]);
                            }
                        }
                    },
                    {
                        prop: 'remark',
                        label: '备注信息',
                        search: true,
                    },
                    {
                        prop: 'created_at',
                        label: '留言日期',
                        width: '220'
                    },
                    {
                        label: '操作',
                        width: '200',
                        tools: {
                            edit: {
                                type: 'primary',
                                icon: 'el-icon-edit',
                                text:'备注处理信息'
                            },
                        }
                    }
                ],
                options:[
                        {   value: '0',
                            label: '未处理',
                        },
                        {   value: '1',
                            label: '处理中',
                        },
                        {   value: '2',
                            label: '已处理',
                        },
                        {   value: '3',
                            label: '无效信息',
                        },
                        {   value: '4',
                            label: '全部信息',
                        },
                ],
                Selection:'0',
                remark:'',
                id:''
            }
        },
        mounted(){
            this.handleSetFilter('where',{status:0});
        },
        methods: {
            handleTools(type, index, row) {
                if (type == 'edit') {
                    this.remark = row.remark;
                    this.dialog = true;
                    //id挂载到全局
                    this.id = row.id;
                }
            },
            //过滤文章分类
            handleChange(value) {
                if (value == 4) {
                    this.handleSetFilter('where',{});
                    return this.handleRenderTable();
                }
                this.handleSetFilter('where',{status:value});
                this.handleRenderTable();
            },
            ok(){
                orderEdit(this.id, {remark:this.remark}).then(response=>{
                    this.$message.success(response.data.msg);
                    this.dialog = false;
                    this.handleRenderTable();
                });
            }
        }
    }
</script>

<style>
    .el-input__inner {
        height: 35px;
    }
</style>

<template>
    <div>
        <div style="margin: 8px 0">
            <el-row>
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
        <div class="myTable">
            <Table ref="table" :url="url" :columns="columns" v-on:tools="handleTools"></Table>
        </div>
    </div>
</template>

<script>
    import Table from "@/components/public/table";
    import list_page from "@/mixins/list_page";
    import {urlDel, urlBatchDel} from "@/api/article"
    export default {
        components: {Table},
        mixins: [list_page],
        data() {
            return {
                url: 'url',
                addFormVisible: false,
                editFormVisible: false,
                columns: [
                    {
                        prop: 'id',
                        label: 'ID',
                        sort: true,
                        search: true,
                        width: '80'
                    },
                    {
                        prop: 'url',
                        label: '域名链接',
                        search: true,
                        width: '380',
                    },
                    {
                        prop: 'type',
                        label: '域名类型',
                        width: '180',
                        filter: {            // 是否可筛选,不需要筛选则不填此属性
                            multiple: false,                     // 是否可多选，默认为true
                            data: [
                                {
                                    value: '0',
                                    text: 'A链接',
                                },
                                {
                                    value: '1',
                                    text: 'B链接',
                                },

                            ]
                        },
                        render: {
                            props: {
                                row: Object         // 接受当前行参数
                            },
                            render: function (createElement) {
                                return createElement('span', {}, this.row.url_type)
                            }
                        }
                    },
                    {
                        prop: 'click',
                        label: '域名访问量',
                        width: '180',
                    },
                    {
                        prop: 'survival_time',
                        label: '存活时间',
                        width: '180',
                    },
                    {
                        prop: 'last_time',
                        label: '最后检测时间',
                        width: '180',
                    },
                    {
                        prop: 'status',
                        label: '状态',
                        width: '180',
                    },
                ],

            }
        },
        methods: {
            // 工具栏事件处理 type值为columns中tools的键值
            handleTools(type, index, row) {
                if (type == 'edit') {
                    //编辑数据
                    this.editFormVisible = true;
                    this.edit_id = row.id;
                    this.urls = row.url;
                    this.typeValue = row.type;
                } else if (type == 'delete') {
                    //删除数据
                    urlDel(row.id).then((response) => {
                        //成功响应动态移除表格项
                        this.handleDeleteRow(index);
                        //提示信息
                        this.$message.success(response.data.msg);
                    });
                } else {
                    console.error('Tools Event:' + type + ' Not found');
                }
            },
            handleAdd() {
                //跳转到发布文章页面
                this.addFormVisible =true;
            },
            handleDel(){
                urlBatchDel(this.handleGetSelection('id')).then((response)=>{
                    this.handleRenderTable();
                    this.$message.success(response.data.msg);
                })
            },
            //tool栏按钮权限控制
            handleGetBtn() {
                let conf = {
                    edit: {
                        type: 'primary',
                        icon: 'el-icon-edit',
                    },

                    delete: {
                        type: 'danger',
                        icon: 'el-icon-delete',
                    }
                };
                let result = {};
                this.$store.state.user.auth.article_list.forEach(item => {
                    if (item in conf) {
                        result[item] = conf[item];
                    }
                });
                return conf;
            }
        }
    }
</script>

<style scoped>
    .myTable >>> .el-pagination {
        float: left!important;
    }
</style>

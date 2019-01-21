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
        <Table ref="table" :url="url" :columns="columns" :checkbox="false" v-on:tools="handleTools"></Table>
    </div>
</template>

<script>
    import Table from "../../components/public/table";
    import list_page from "../../mixins/list_page";
    import {recovery_list,recovery_article,recovery_del} from "@/api/recovery"
    import {getList} from "@/api/category"

    export default {
        components: {Table},
        mixins: [list_page],
        data() {
            return {
                page_name: '文章',
                url: '/recovery/list',
                columns: [
                    {
                        prop: 'id',
                        label: 'ID',
                        sort: true,
                        width: '80'
                    },
                    {
                        prop: 'title',
                        label: '文章标题',
                        search: true,
                    },
                    {
                        prop: 'category',
                        label: '分类',
                        width: '180'
                    },
                    {
                        prop: 'status',
                        label: '简介/关键字/封面',
                        width: '120',
                        render:{
                            props: {
                                row: Object         // 接受当前行参数
                            },
                            render: function (createElement) {
                                // 参考链接 https://cn.vuejs.org/v2/guide/render-function.html#%E8%99%9A%E6%8B%9F-DOM
                                return createElement('div', [
                                    createElement('span',{
                                        style: {
                                            color: this.row.status.desc.color,
                                            fontSize: '30px',
                                            padding:'5px'
                                        },
                                    }, this.row.status.desc.status),
                                    createElement('span',{
                                        style: {
                                            color: this.row.status.keywords.color,
                                            fontSize: '30px',
                                            padding:'5px'
                                        },
                                    }, this.row.status.keywords.status),
                                    createElement('span',{
                                        style: {
                                            color: this.row.status.photo.color,
                                            fontSize: '30px',
                                            padding:'5px'
                                        },
                                    }, this.row.status.photo.status),
                                ])
                            }
                        }
                    },
                    {
                        prop: 'other',
                        label: '置顶/开放评论/推荐',
                        width: '140',
                        render:{
                            props: {
                                row: Object         // 接受当前行参数
                            },
                            render: function (createElement) {
                                // 参考链接 https://cn.vuejs.org/v2/guide/render-function.html#%E8%99%9A%E6%8B%9F-DOM
                                return createElement('div', [
                                    createElement('span',{
                                        style: {
                                            color: this.row.other.top.color,
                                            fontSize: '30px',
                                            padding:'5px'
                                        },
                                    }, this.row.other.top.status),
                                    createElement('span',{
                                        style: {
                                            color: this.row.other.discuss.color,
                                            fontSize: '30px',
                                            padding:'5px'
                                        },
                                    }, this.row.other.discuss.status),
                                    createElement('span',{
                                        style: {
                                            color: this.row.other.recommend.color,
                                            fontSize: '30px',
                                            padding:'5px'
                                        },
                                    }, this.row.other.recommend.status),
                                ])
                            }
                        }
                    },
                    {
                        prop: 'click',
                        label: '点击量',
                        sort: true,
                        width: '100'
                    },
                    {
                        prop: 'publish_time',
                        label: '发布日期',
                        sort: true,
                        width: '120'
                    },
                    {
                        label: '操作',
                        width: '200',
                        tools: this.handleGetBtn()
                    }
                ],
                articleAuth: [
                    {
                        add: false,
                    },
                ],
                options: [],
                selectedOptions: [],
            }
        },
        created:function() {
            getList().then(response=>{
                this.options = response.data.data;
            })
        },
        methods: {
            // 工具栏事件处理 type值为columns中tools的键值
            handleTools(type, index, row) {
                if (type == 'recovery') {
                    recovery_article(row.id).then(response=>{
                        //成功响应动态移除表格项
                        this.handleDeleteRow(index);
                        //提示信息
                        this.$message.success(response.data.msg);
                    });
                } else if (type == 'delete') {
                    //删除数据
                    recovery_del(row.id).then((response) => {
                        //成功响应动态移除表格项
                        this.handleDeleteRow(index);
                        //提示信息
                        this.$message.success(response.data.msg);
                    });
                } else {
                    console.error('Tools Event:' + type + ' Not found');
                }
            },
            //tool栏按钮权限控制
            handleGetBtn() {
                let conf = {
                    recovery:{
                        type: 'warning',
                        icon: 'el-icon-refresh',
                        text:'恢复文章'
                    },
                    delete: {
                        type: 'danger',
                        icon: 'el-icon-delete',
                        text:'彻底删除'
                    }
                };
                let result = {};
                this.$store.state.user.auth.recovery.forEach(item => {
                    if (item in conf) {
                        result[item] = conf[item];
                    }
                });
                return result;
            }
        }
    }
</script>

<style>
    .el-input__inner {
        height: 35px;
    }
</style>

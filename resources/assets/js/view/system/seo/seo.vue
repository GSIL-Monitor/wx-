<template>
    <div>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">添加{{page_name}}</el-button>
        <Table ref="table" :url="url" :columns="columns" :checkbox="false" v-on:tools="handleTools"></Table>

        <el-dialog :title="'添加'+page_name" :visible.sync="addFormVisible">
            <Add ref="addForm" v-if="addFormVisible" v-on:close="addFormVisible = false" v-on:render="this.handleRenderTable"></Add>
        </el-dialog>

        <el-dialog :title="'编辑'+page_name" :visible.sync="editFormVisible">
            <Edit ref="editForm" :id="edit_id" v-if="editFormVisible" v-on:render="this.handleRenderTable"
                  v-on:close="editFormVisible = false"></Edit>
        </el-dialog>
    </div>
</template>

<script>
    import Table from "@/components/public/table";
    import list_page from "@/mixins/list_page";
    import {SeoDelete} from "@/api/nav"
    import Add from "./add";
    import Edit from "./edit";

    export default {
        components: {Table,Add,Edit},
        mixins: [list_page],
        data() {
            return {
                page_name: '推广设置',
                url: 'seo',
                addFormVisible: false,
                editFormVisible: false,
                columns: [
                    {
                        prop: 'id',
                        label: 'ID',
                        width: '80'
                    },
                    {
                        prop: 'name',
                        label: '名称',
                    },
                    {
                        prop: 'desc',
                        label: '网页描述',
                    },
                    {
                        prop: 'keywords',
                        label: '网页关键字',
                    },
                    {
                        prop: 'title',
                        label: '网页标题',
                    },
                    {
                        label: '操作',
                        width: '200',
                        tools: {
                            edit: {
                                type: 'primary',
                                icon: 'el-icon-edit',
                            },
                            delete: {
                                type: 'danger',
                                icon: 'el-icon-delete',
                            }
                        }
                    }
                ],
            }
            },
        methods: {
            // 工具栏事件处理 type值为columns中tools的键值
            handleTools(type, index, row) {
                if (type == 'edit') {
                    //编辑数据
                    this.edit_id = row.id;
                    this.editFormVisible = true;
                } else if (type == 'delete') {
                    //删除数据
                    SeoDelete(row.id).then((response) => {
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
                this.addFormVisible = true;
            },
        }
    }
</script>

<style>
    .el-input__inner {
        height: 35px;
    }
</style>

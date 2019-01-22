<template>
    <div>
        <div style="margin: 8px 0">
            <el-row>
                <el-col :span="14">
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">添加来源</el-button>
                    <el-button type="danger" size="small" icon="el-icon-plus" @click="handleDel">删除来源</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="chart-left">
            <Table ref="table" :url="url" :columns="columns" v-on:tools="handleTools"></Table>
        </div>
        <el-dialog title="添加来源" :visible.sync="addFormVisible">
            <Add ref="addForm"
                 v-if="addFormVisible"
                 v-on:close="addFormVisible = false"
                 v-on:render="this.handleRenderTable">
            </Add>
        </el-dialog>

        <el-dialog title="编辑来源" :visible.sync="editFormVisible">
            <Edit ref="editForm"
                  :id="edit_id"
                  v-if="editFormVisible"
                  v-on:render="this.handleRenderTable"
                  v-on:close="editFormVisible = false">
            </Edit>
        </el-dialog>
    </div>
</template>

<script>
    import Add from "./add";
    import Edit from "./edit";
    import Table from "@/components/public/table";
    import list_page from "@/mixins/list_page";
    import {sourceDelete, sourceBatchIdDelete} from "@/api/goods";

    export default {
        name: "source_manage",
        components: {Table, Add, Edit},
        mixins: [list_page],
        data() {
            return {
                url: 'source',
                addFormVisible: false,
                editFormVisible: false,
                edit_id: "",
                columns: [
                    {
                        prop: 'id',
                        label: 'ID',
                        width: '80'
                    },
                    {
                        prop: 'name',
                        label: '来源名称',
                        width:"200"
                    },
                    {
                        label: '操作',
                        tools: this.handleGetBtn()
                    }
                ],
            }
        },
        methods: {
            //tool栏按钮权限控制
            handleGetBtn() {
                let  conf= {
                    edit: {
                        type: 'primary',
                        icon: 'el-icon-edit',
                    },
                    delete: {
                        type: 'danger',
                        icon: 'el-icon-delete',
                    }
                };
                return conf;
            },
            // 工具栏事件处理 type值为columns中tools的键值
            handleTools(type, index, row) {
                if (type == 'edit') {
                    //编辑数据
                    this.edit_id = row.id;
                    //展示编辑弹窗
                    this.editFormVisible = true;
                }
                else if (type == 'delete') {
                    //删除数据
                    sourceDelete(row.id).then((response) => {
                        if (response.data.code == -1) {
                            //提示信息
                            return this.$message.error(response.data.msg);
                        }
                        //成功响应动态移除表格项
                        this.handleDeleteRow(index);
                        //提示信息
                        this.$message.success(response.data.msg);
                    });
                }
                else {
                    console.error('Tools Event:' + type + ' Not found');
                }
            },
            //添加来源
            handleAdd() {
                this.addFormVisible = true;
            },
            //删除来源
            handleDel() {
               let ids = this.handleGetSelection('id');
                sourceBatchIdDelete({id:ids}).then((response)=>{
                    this.$message.success('成功删除');
                    this.handleRenderTable()
                })
            }


        }
    }
</script>

<style scoped>
.chart-left >>> .el-pagination {
    float: left!important;
}

</style>
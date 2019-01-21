<template>
    <div>
        <div style="margin: 8px 0">
            <el-row>
                <el-col :span="14">
                    <template v-if=" this.friendLinkAuth.add">
                        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">添加{{page_name}}</el-button>
                    </template>
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

        <el-dialog :title="'添加'+page_name" :visible.sync="addFormVisible">
            <Add ref="addForm" v-if="addFormVisible" v-on:close="addFormVisible = false" v-on:render="this.handleRenderTable"></Add>
        </el-dialog>

        <el-dialog :title="'编辑'+page_name" :visible.sync="editFormVisible">
            <Edit ref="editForm" :id="edit_id" v-if="editFormVisible" v-on:render="this.handleRenderTable" v-on:close="editFormVisible = false"></Edit>
        </el-dialog>
    </div>
</template>

<script>
    import Table from "../../../components/public/table";
    import list_page from "../../../mixins/list_page";
    import {friend_del} from "@/api/friendLink"
    import Add from "./add";
    import Edit from "./edit";

    export default {
        components: {Table,Add,Edit},
        mixins: [list_page],
        data() {
            return {
                page_name: '模板',
                url: 'friend_link/list',
                addFormVisible: false,
                editFormVisible: false,
                columns: [
                    {
                        prop: 'id',
                        label: 'ID',
                        sort: true,
                        width: '80'
                    },
                    {
                        prop: 'name',
                        label: '友链名称',
                        search: true,
                    },
                    {
                        prop: 'url',
                        label: '友链地址',
                    },
                    {
                        label: '操作',
                        width: '200',
                        tools: this.handleGetBtn()
                    }
                ],
                friendLinkAuth: [
                    {
                        add: false,
                    },
                ],
                options: [],
                selectedOptions: [],
            }
        },
        created: function () {
            let friendLink_Auth = this.$store.state.user.auth.friendlink;
            friendLink_Auth.forEach((value) => {
                if (value === 'add') {
                    this.friendLinkAuth.add = true;
                    return true;
                }
            });
        },
        methods: {
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
                    friend_del(row.id).then((response) => {
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
            handleAdd(){
                this.addFormVisible = true;
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
                this.$store.state.user.auth.friendlink.forEach(item => {
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

<template>
    <div>
        <div style="margin: 8px 0">
            <el-row>
                <el-col :span="14" style="text-align: left">
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="disableSelected">禁用所选项</el-button>
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="Add">添加{{page_name}}</el-button>
                </el-col>
                <el-col :span="10">
                    <el-input placeholder="请输入要搜索的内容..." size="small" v-model="search.value" class="input-with-select">
                        <el-select style="width: 110px;" size="small" v-model="search.field" slot="prepend" placeholder="请选择">
                            <el-option v-for="item in columns" :key="item.prop" v-if="item.search" :label="item.label" :value="item.prop"></el-option>
                        </el-select>
                        <el-button size="small" slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                    </el-input>
                </el-col>
            </el-row>
        </div>

        <Table ref="table" :url="url" :columns="columns" v-on:tools="Tools"></Table>

        <el-dialog :title="'添加'+page_name" :visible.sync="addFormVisible">
            <Add ref="addForm" v-if="addFormVisible" v-on:close="addFormVisible = false" v-on:render="this.handleRenderTable"></Add>
        </el-dialog>
        <el-dialog :title="'编辑'+page_name" :visible.sync="editFormVisible">
            <Edit ref="editForm" :id="tools_id" v-if="editFormVisible" v-on:close="editFormVisible = false"  v-on:render="this.handleRenderTable"></Edit>
        </el-dialog>

    </div>
</template>

<script>
    import Table from "../../../components/commons/table";
    import Add from "./add";
    import Edit from "./edit";
    import list from "../../../mixins/list";
    import { BaseData } from "../../../config";
    import { delUser } from "../../../api/user";

    export default {
        components: {Table, Add, Edit},
        mixins: [list],
        data() {
            return {
                page_name: '用户',
                url: 'user',
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
                        prop: 'username',
                        label: '用户名',
                        search: true,
                    },
                    {
                        prop: 'mobile',
                        label: '手机号码',
                        search: true,
                    },
                    {
                        prop: 'email',
                        label: '邮箱',
                        search: true,
                    },
                    {
                        prop: 'sex',
                        convert: true,
                        label: '性别',
                        filter:{
                            data:BaseData.Get('sex')
                        }
                    },
                    {
                        prop: 'type',
                        convert: true,
                        label: '用户类型',
                        filter:{
                            data:BaseData.Get('user_type')
                        }
                    },
                    {
                        prop:"status",
                        label: '用户状态',
                        filter:{
                            data:BaseData.Get('user_state')
                        },
                        render:(h, params) => {
                            return h('div', [
                                h('span', "123"),
                                h('strong', "ewq"+params.row.id),
                            ]);
                        }
                    },
                    {
                        label: '操作',
                        width: '200',
                        tools:{
                            // 键名对应 handleTools 中的type参数
                            edit:{
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
                select:[],
                user_ids:[],
            }
        },

        methods: {
            // 工具栏事件处理
            Tools(event, index, row) {
                this.tools_id = row.id;
                if (event == 'edit'){
                    this.editFormVisible = true;
                } else if (event == 'delete') {
                    //删除数据
                    delUser(row.id).then((response)=>{
                        //成功响应动态移除表格项
                        this.handleDeleteRow(index);
                        //提示信息
                        this.$message.success(response.data.msg);
                    });
                }
            },
            Add(){
                this.addFormVisible = true;
            },

            disableSelected(){
                console.log(this.handleAdd())
            }

        }
    }
</script>

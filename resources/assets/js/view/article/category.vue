<template>
    <div>
        <div style="width: 40%">
            <el-tree
                        :data="category"
                        node-key="id"
                        default-expand-all
                        :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
            <template v-if="categoryAuth.add">
                 <el-button
                     type="text"
                     size="mini"
                     @click="() => append(data)">
                    添加分类
                  </el-button>
            </template>
            <template v-if="categoryAuth.edit">
                 <el-button
                     type="text"
                     size="mini"
                     @click="() => edit(node, data)">
                    修改名称
                </el-button>
            </template>
            <template v-if="categoryAuth.delete">
                 <el-button
                         type="text"
                         size="mini"
                         @click="() => remove(node, data)">
                    删除分类
                </el-button>
            </template>
        </span>
      </span>
                </el-tree>
        </div>
        <el-dialog :title="title" :visible.sync="dialog" width="20%" center>
            <el-input style="width: 70%" v-model="name" placeholder="输入分类名称"></el-input>
            <el-button type="primary" @click="ok">确 定</el-button>
        </el-dialog>
    </div>
</template>


<script>
    import {getList,category_del,category_add,category_edit} from '@/api/category';
    let id = 1000;
    export default {
        data() {
            return {
                category: [{
                    id: 0,
                    label: '文章分类管理',
                    children:[]
                }],
                title:'添加分类',
                dialog:false,
                name:null,
                itemData:null,
                isEdit :false,
                categoryAuth:[
                    {
                        add:false,
                        edit:false,
                        delete:false,
                    }
                ]
            }
        },
        created:function(){
            getList().then(response=>{
                this.category[0].children = response.data.data;
            });
            let category_Auth = this.$store.state.user.auth.article_category;
            category_Auth.forEach((value) => {
                if (value === 'add') {
                    this.categoryAuth.add = true;
                    return true;
                }
                if (value === 'edit') {
                    this.categoryAuth.edit = true;
                    return true;
                }
                if (value === 'delete') {
                    this.categoryAuth.delete = true;
                    return true;
                }
            });
        },
        methods: {
            append(data) {
                this.title = '添加分类';
                //先清空对话框里面的输入框的值
                this.name = '';
                //判断一下是否超过了2级
                if (data.pid > 0){
                    this.$message.error('当前层不允许在添加分类了!');
                    return false;
                }
                this.itemData = data;
                this.dialog = true;
            },
            ok(){
                if (this.isEdit) {
                    return this.handelEdit()
                } else {
                    return this.handleAdd();
                }
            },
            handleAdd(){
                category_add({name:this.name,pid:this.itemData.id}).then(response=>{
                    if (response.data.code === 0) {
                        //关闭对话框
                        this.dialog = false;
                        const newChild = response.data.data;
                        if (!this.itemData.children) {
                            this.$set(this.itemData, 'children', []);
                        }
                        this.itemData.children.push(newChild);
                        this.$message.success('添加成功');
                    }else {
                        this.$message.error('添加失败');
                    }

                });
            },
            handelEdit(){
                category_edit({name:this.name},this.itemData.id).then(response=>{
                    if (response.data.code === 0) {
                        //关闭对话框
                        this.dialog = false;
                        this.isEdit = false; //结束编辑状态
                        this.itemData.name = this.name;
                        this.itemData.label = this.name;
                        this.$message.success('修改成功');
                    }else {
                        this.$message.error('修改失败');
                    }
                });
            },
            edit(node, data){
                this.title = '修改分类名称';
                //先清空对话框里面的输入框的值
                this.name = '';
                this.isEdit = true; //当前是修改状态
                this.name = data.name; //吧数据挂载到全局方便其他函数调用
                this.itemData = data;  //吧数据挂载到全局方便其他函数调用
                this.dialog = true; //显示对话框
            },
            remove(node, data) {
                if (data.id == 0) {
                    return false;
                }
                category_del(data.id).then(response=>{
                    if(response.data.code === 0){
                        this.$message.success(response.data.msg);
                        const parent = node.parent;
                        const children = parent.data.children || parent.data;
                        const index = children.findIndex(d => d.id === data.id);
                        children.splice(index, 1);
                    }else{
                        this.$message.error(response.data.msg);
                        return false;
                    }
                });
            },
        }
    };
</script>

<style>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>
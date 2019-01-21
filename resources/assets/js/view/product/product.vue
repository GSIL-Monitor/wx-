<template>
    <div>
        <div style="width: 70%">
            <el-tree
                    :data="product"
                    node-key="id"
                    default-expand-all
                    :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
            <!--<template v-if="productAuth.add">-->
                 <el-button type="text" size="mini" @click="() => append(data)">添加内容</el-button>
            <!--</template>-->
            <!--<template v-if="productAuth.edit">-->
                 <el-button type="text" size="mini" @click="() => edit(node, data)">修改内容</el-button>
            <!--</template>-->
            <!--<template v-if="productAuth.delete">-->
                 <el-button type="text" size="mini" @click="() => remove(node, data)">删除内容</el-button>
            <!--</template>-->
        </span>
      </span>
            </el-tree>
        </div>
        <el-dialog :title="title" :visible.sync="dialog" width="50%" center>
            <el-input style="width: 70%" v-model="content" placeholder="输入分类名称"></el-input>
            <el-button type="primary" @click="ok">确 定</el-button>
        </el-dialog>
    </div>
</template>


<script>
    import {getList, product_del, product_add, product_edit} from '@/api/product';

    let id = 1000;
    export default {
        data() {
            return {
                product: [{
                    id: 0,
                    label: '产品信息介绍',
                    children: []
                }],
                title: '添加信息',
                dialog: false,
                content: null,
                itemData: null,
                isEdit: false,
                productAuth: [
                    {
                        add: true,
                        edit: true,
                        delete: true,
                    }
                ]
            }
        },
        created: function () {
            getList().then(response => {
                this.product[0].children = response.data.data;
            });
            // let product_Auth = this.$store.state.user.auth.article_product;
            // product_Auth.forEach((value) => {
            //     if (value === 'add') {
            //         this.productAuth.add = true;
            //         return true;
            //     }
            //     if (value === 'edit') {
            //         this.productAuth.edit = true;
            //         return true;
            //     }
            //     if (value === 'delete') {
            //         this.productAuth.delete = true;
            //         return true;
            //     }
            // });
        },
        methods: {
            append(data) {
                this.title = '添加信息';
                //先清空对话框里面的输入框的值
                this.content = '';
                //判断一下是否超过了3级
                if (data.lv >= 3) {
                    this.$message.error('当前层不允许在添加分类了!');
                    return false;
                }
                //  this.itemData =  JSON.parse(JSON.stringify(data));
                this.itemData = data;
                this.dialog = true;
            },
            ok() {
                if (this.isEdit) {
                    return this.handelEdit()
                } else {
                    return this.handleAdd();
                }
            },
            handleAdd() {
                product_add({content: this.content, pid: this.itemData.id, lv: this.itemData.lv}).then(response => {
                    if (response.data.code === 0) {
                        //关闭对话框
                        this.dialog = false;
                        const newChild = response.data.data;
                        if (!this.itemData.children) {
                            this.$set(this.itemData, 'children', []);
                        }
                        this.itemData.children.push(newChild);
                        this.$message.success('添加成功');
                    } else {
                        this.$message.error('添加失败');
                    }

                });
            },
            handelEdit() {
                product_edit({content: this.content}, this.itemData.id).then(response => {
                    if (response.data.code === 0) {
                        //关闭对话框
                        this.dialog = false;
                        this.isEdit = false; //结束编辑状态
                        this.itemData.content = this.content;
                        this.itemData.label = this.content;
                        this.$message.success('修改成功');
                    } else {
                        this.$message.error('修改失败');
                    }
                });
            },
            edit(node, data) {
                this.title = '修改信息';
                //先清空对话框里面的输入框的值
                this.content = '';
                this.isEdit = true; //当前是修改状态
                this.content = data.content; //吧数据挂载到全局方便其他函数调用
                this.itemData = data;  //吧数据挂载到全局方便其他函数调用
                this.dialog = true; //显示对话框
            },
            remove(node, data) {
                if (data.id == 0) {
                    return false;
                }
                product_del(data.id).then(response => {
                    if (response.data.code === 0) {
                        this.$message.success(response.data.msg);
                        const parent = node.parent;
                        const children = parent.data.children || parent.data;
                        const index = children.findIndex(d => d.id === data.id);
                        children.splice(index, 1);
                    } else {
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
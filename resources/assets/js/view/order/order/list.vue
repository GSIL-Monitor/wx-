<template>
    <div>
        <div style="margin: 8px 0">
            <el-row>
                <el-col :span="14">
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="handleSelect">删除订单信息</el-button>
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
        <div class="myTable">
            <Table ref="table" :url="url" :columns="columns" v-on:tools="handleTools"></Table>
        </div>

    </div>
</template>

<script>
    import Table from "@/components/public/table";
    import list_page from "@/mixins/list_page";
    import {getConfigArray} from "@/config/sys_config";
    import {goodsIdDelete, goodsBatchDelete} from "@/api/goods"

    export default {
        components: {Table},
        mixins: [list_page],
        data() {
            return {
                url: 'goodsOrder',
                columns: [
                    {
                        prop: 'id',
                        label: 'ID',
                        sort: true,
                        width: '80'
                    },
                    {
                        prop: 'meal_name',
                        label: '购买产品+数量+套餐',
                        search: true,
                        width:350,
                        render: {
                            props: {
                                row: Object         // 接受当前行参数
                            },
                            render: function (createElement) {
                                return createElement('div', {}, [
                                    createElement('p', {}, '订单号:'+this.row.order_num),
                                    createElement('p', {}, "下单时间:"+this.row.created_at),
                                    createElement('p', {}, this.row.goods_name),
                                    createElement('p', {}, this.row.meal_name+"×"+this.row.num),
                                ]);

                            }
                        }
                    },
                    {
                        prop: 'paytype',
                        label: '支付方式',
                        render: {
                            props: {
                                row: Object         // 接受当前行参数
                            },
                            render: function (createElement) {
                                return createElement('div', {}, [
                                    createElement('el-tag', {
                                        attr:{
                                            type:"success"
                                        }
                                    }, this.row.paytype),
                                    createElement('p', {
                                        style:{
                                            color:"red"
                                        }
                                    }, "总额:"+this.row.order_total_price),
                                ]);
                            }
                        }
                    },
                    {
                        prop: 'name',
                        label: '收货人',
                        width:100
                    },
                    {
                        prop: 'address',
                        label: '地址',
                        width:300,
                        render: {
                            props: {
                                row: Object         // 接受当前行参数
                            },
                            render: function (createElement) {
                                return createElement('div', {}, [
                                    createElement('p', {}, "地址:"+this.row.address),
                                    createElement('p', {}, "IP:"+this.row.ip),
                                ]);
                            }
                        }
                    },
                    {
                        prop: 'message',
                        label: '客户留言',
                    },
                    {
                        prop: 'source',
                        label: '订单来源',
                        render: {
                            props: {
                                row: Object         // 接受当前行参数
                            },
                            render: function (createElement) {
                                return createElement('div', {}, [
                                    createElement('el-tag', {
                                        attr:{
                                            type:"success"
                                        }
                                    }, this.row.source),
                                ]);
                            }
                        }
                    },
                    {
                        prop: 'status',
                        label: '订单状态',
                    },
                    {
                        label: '操作',
                        width: '200',
                        tools: this.handleGetBtn()
                    }
                ],
            }
        },
        methods: {
            // 工具栏事件处理 type值为columns中tools的键值
            handleTools(type, index, row) {
                if (type == 'edit') {
                    this.$router.push({
                        path: '/edit_goods',
                        name: "edit_goods",
                        params: {
                            id: row.id,
                        }
                    });
                } else if (type == 'delete') {
                    //删除数据
                    goodsIdDelete(row.id).then((response) => {
                        //成功响应动态移除表格项
                        this.handleDeleteRow(index);
                        //提示信息
                        this.$message.success(response.data.msg);
                    });
                } else if (type == 'extension') {
                    this.$router.push({
                        path: '/edit_goods',
                        name: "edit_goods",
                        params: {
                            id: row.id,
                            sub: 'fourth'
                        }
                    });
                }
                else {
                    console.error('Tools Event:' + type + ' Not found');
                }
            },

            //tool栏按钮权限控制
            handleGetBtn() {
                let conf = {
                    show: {
                        type: 'success',
                        icon: 'el-icon-view',
                        text: "查看详情"
                    },
                    delete: {
                        type: 'danger',
                        icon: 'el-icon-delete',
                    },
                    search:{
                        type: 'primary',
                        icon: 'el-icon-location-outline',
                        text:"属地查询"
                    }
                };
                let result = {};
                this.$store.state.user.auth.auth.forEach(item => {
                    if (item in conf) {
                        result[item] = conf[item];
                    }
                });
                return conf;
            },

            //批量删除
            handleSelect() {
                //禁用多选用户操作
                let ids = this.handleGetSelection('id');
                if (ids.length === 0) {
                    this.$message.error('请选择一个选项后再进行进行操作');
                    return false;
                }
                goodsBatchDelete({id: ids}).then((response) => {
                    //重载表格
                    this.handleRenderTable();
                    //响应消息
                    this.$message.success(response.data.msg);
                });
            },
        }
    }
</script>

<style scoped>
    .myTable >>> p{
        padding: 0;
        margin: 0;
        font-size: 14px;
    }

</style>

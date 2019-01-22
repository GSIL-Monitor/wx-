<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="商品基本信息" name="first">
            <div class="left">
                <el-form label-width="80px" :model="goods">
                    <el-form-item label="商品标题:">
                        <el-input  placeholder="商品标题" v-model="goods.goods_title"></el-input>
                    </el-form-item>
                    <el-form-item label="商品简述:">
                        <el-input  placeholder="商品简述" v-model="goods.goods_desc"></el-input>
                    </el-form-item>
                    <el-form-item  label="商品参数:">
                        <el-input  type="textarea" autosize
                                  placeholder="产品参数格式 面料:纯棉 风格:圆领" v-model="goods.params">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="详细描述:">
                       <vue-ueditor-wrap :config="Ueconfig" v-model="goods.goods_content"></vue-ueditor-wrap>
                    </el-form-item>
                    <el-form-item label="封面图片" prop="photo">
                        <upload :img="goods.photo" v-on:img-success="success"></upload>
                    </el-form-item>
                    <el-form-item label="轮播图片" prop="photo">
                        <upload :img="goods.wheel_photo" v-on:img-success="wheel_success"></upload>
                    </el-form-item>
                </el-form>
            </div>
            <div class="right">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>其他选项</span>
                    </div>
                    <p>
                        <el-input v-model="goods.price" placeholder="商品价格"></el-input>
                    </p>
                    <p>
                        <el-select v-model="value" placeholder="请选择一个商品展示模板">
                            <el-option
                                    v-for="item in template"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </p>
                    <p>
                        <el-checkbox true-label="1" false-label="0" v-model="goods.is_up">是否上架</el-checkbox>
                    </p>
                    <el-button type="primary" @click="goodsAdd">发布商品</el-button>
                </el-card>
            </div>
        </el-tab-pane>
        <el-tab-pane label="套餐设置" name="second">
            <el-row>
                <el-col :span="16">
                    <el-button type="primary">添加套餐</el-button>
                    <el-button type="danger">删除套餐</el-button>
                    <el-button type="success">返回产品列表</el-button>
                    <Table ref="table"></Table>
                </el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
</template>
<script>
    import Table from "@/components/public/table";
    import VueUeditorWrap from 'vue-ueditor-wrap';
    import upload from '@/components/public/upload';
    export default {
        components: {
            upload, VueUeditorWrap,Table
        },
        data() {
            return {
                activeName: 'first',
                goods:{
                    goods_title:"",
                    set_meal:"",
                    set_meal_price:"",
                    set_meal_stock:"",
                    goods_desc:"",
                    params:"",
                    goods_content:"",
                    wheel_photo:"",
                    photo:"",
                    price:"",
                    is_up:"1",
                },
                Ueconfig: {
                    serverUrl: '/static/UEditor/php/controller.php'
                },
                template:[]
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            success(value) { //封面图片上传成功回调
                this.goods.photo = value;
            },
            wheel_success(value) { //轮播图片上传成功回调
                this.goods.wheel_photo = value;
            },
            goodsAdd() {
                console.log(1);
            }
        }
    };
</script>

<style scoped>
    .left {
        float: left;
        width: 55%;
    }

    .right {
        width: 30%;
        float: right;
    }
    .edui-editor {
        width: 100% !important;
    }
    .edui-editor-iframeholder {
        width: 100% !important;
    }
</style>
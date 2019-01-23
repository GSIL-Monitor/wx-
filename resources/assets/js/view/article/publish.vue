<template>
    <div>
        <div style="width: 65%" class="left">
            <el-form ref="articleForm" :model="articleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                <el-form-item label="文章标题" prop="title">
                    <el-input v-model="articleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="文章内容" prop="content">
                    <vue-ueditor-wrap :config="Ueconfig" v-model="articleForm.content"></vue-ueditor-wrap>
                </el-form-item>
                <el-form-item label="文章描述" prop="description">
                    <el-input v-model="articleForm.description" placeholder="文章描述"></el-input>
                </el-form-item>
                <el-form-item label="访问链接" prop="url">
                    <el-input v-model="articleForm.url" placeholder="当前文章的访问URL地址必选"></el-input>
                </el-form-item>
                <el-form-item label="文章分类" prop="category">
                    <el-cascader
                            expand-trigger="click"
                            :options="options"
                            placeholder="发表文章需要选择一个分类"
                            v-model="articleForm.category">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="封面图片" prop="photo">
                    <upload :img="articleForm.photo" v-on:img-success="success"></upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('articleForm')">立即发表</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="right">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>其他选项</span>
                </div>
                <p>
                    <el-input v-model="articleForm.appid" placeholder="微信appId"></el-input>
                </p>
                <p>
                    <el-input v-model="articleForm.key" placeholder="微信密匙"></el-input>
                </p>
                <p>
                    <el-input v-model="articleForm.cnzz" placeholder="第三方流量统计"></el-input>
                </p>
                <p>
                    <el-input v-model="articleForm.music" placeholder="背景音乐"></el-input>
                </p>
                <p>
                    <el-input v-model="articleForm.right_now" placeholder="文章立即跳转到指定地址"></el-input>
                </p>
                <p>
                    <el-input v-model="articleForm.arrow" placeholder="点击文章箭头返回"></el-input>
                </p>
                <p>
                    <el-input v-model="articleForm.physics" placeholder="物理按键点击返回"></el-input>
                </p>
                <p>
                    <el-radio v-model="articleForm.is_wechat" label="1">开启微信检测</el-radio>
                    <el-radio v-model="articleForm.is_wechat" label="0" style="margin-right: 25px">浏览器打开</el-radio>
                    <el-checkbox true-label="1" false-label="0" v-model="articleForm.random_jump">开启随机跳转</el-checkbox>
                </p>
            </el-card>
        </div>
    </div>
</template>

<script>
    import form_page from '@/mixins/form_page';
    import upload from '@/components/public/upload';
    import {article_add} from '@/api/article';
    import {getList} from '@/api/category';
    import {template_getList} from '@/api/articleTemplate';
    import VueUeditorWrap from 'vue-ueditor-wrap';

    export default {
        mixins: [form_page],
        name: "publish",
        data() {
            return {
                articleForm: {
                    random_jump: "1", //开启随机跳转
                    is_wechat: "1",  //是否是微信浏览器
                    title: '',    //文章标题
                    description: '', //文章描述
                    content: '',    //文章内容
                    arrow: '', //点击箭头返回
                    physics: '', //物理按键点击返回
                    photo: '',  //文章封面
                    url: '',    //文章访问链接
                    category: [],   //文章分类
                    music: "", //背景地址
                    appid: "", //微信Id
                    key: "", //微信密匙
                    right_now: "",//网站立即跳转到指定地址
                    cnzz: "",//文章流量统计
                },
                rules: {
                    title: [{required: true, message: '文章标题为必填项目', trigger: 'blur'},],
                    content: [{required: true, message: '文章内容为必填项目', trigger: 'blur'}],
                    url: [{required: true, message: '文章访问链接必选填写', trigger: 'blur'}],
                },
                options: [],
                Ueconfig: {
                    serverUrl: '/static/UEditor/php/controller.php'
                },
            }
        },
        created: function () {
            //获得分类列表
            getList().then(response => {
                this.options = response.data.data;
            });
        },
        methods: {
            onSubmit(articleForm) {
                if (this.handleValid(articleForm)) {
                    article_add(this.articleForm)
                        .then(response => {
                            this.$message.success(response.data.msg);
                            this.$router.push('/article_list')
                        });
                }
            },
            success(value) {
                this.articleForm.photo = value;
            },
        },
        components: {
            upload, VueUeditorWrap
        }

    }
</script>

<style>
    .left {
        float: left;
        width: 65%;
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

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
</style>
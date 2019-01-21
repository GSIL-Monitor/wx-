<template>
    <div>
        <div style="width: 70%" class="left">
            <el-form ref="articleForm" :model="articleForm" :rules="rules"  label-width="100px" class="demo-ruleForm">
                <el-form-item label="文章标题" prop="title">
                    <el-input v-model="articleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="文章内容" prop="content">
                    <vue-ueditor-wrap :config="Ueconfig" v-model="articleForm.content"></vue-ueditor-wrap>
                </el-form-item>
                <el-form-item label="文章描述" prop="description">
                    <el-input v-model="articleForm.description"></el-input>
                </el-form-item>
                <el-form-item label="文章关键字" prop="keywords">
                    <el-input v-model="articleForm.keywords"></el-input>
                </el-form-item>
                <el-form-item label="文章作者" prop="author">
                    <el-input v-model="articleForm.author"></el-input>
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
                    <el-button @click="close">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="right">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>其他选项</span>
                </div>
                <p>
                    <el-checkbox label="加入推荐" true-label="1" false-label="0" v-model="articleForm.recommend" ></el-checkbox>
                </p>
                <p>
                    <el-checkbox label="开放评论" true-label="1" false-label="0"  v-model="articleForm.discuss"></el-checkbox>
                </p>
                <p>
                    <el-checkbox label="文章置顶" true-label="1" false-label="0"  v-model="articleForm.top"></el-checkbox>
                </p>
                <p>
                    选择模板:&nbsp;
                    <el-select v-model="articleForm.template_id" clearable  placeholder="请选择,不选择为默认">
                        <el-option
                            v-for="item in template"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                    </el-select>
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
                    title: '',
                    description: '',
                    content: '',
                    photo: '',
                    keywords: '',
                    category: [],
                    top:'0',
                    recommend:'0',
                    discuss:'1',
                    template_id:1,
                    author:""
                },
                rules: {
                    title: [{required: true, message: '文章标题为必填项目', trigger: 'blur'},],
                    content: [{required: true, message: '文章内容为必填项目', trigger: 'blur'}],
                    author: [{required: true, message: '文章作者必选填写', trigger: 'blur'}],
                },
                options: [],
                Ueconfig:{
                    serverUrl: '/static/UEditor/php/controller.php'
                },
                template: []
            }
        },
        created:function(){
            //获得分类列表
            getList().then(response=>{
                this.options = response.data.data;
            });
            template_getList().then(response=>{
                this.template = response.data.data;
            })
        },
        methods:{
            onSubmit(articleForm) {
                if(this.handleValid(articleForm)) {
                   article_add(this.articleForm)
                       .then(response=>{
                            this.$message.success(response.data.msg);
                            this.$router.push('/article_list')
                         })
                }
            },
            success(value){
                this.articleForm.photo = value;
            },
        },
        components:{
            upload,VueUeditorWrap
        }

    }
</script>

<style>
    .left{
        float: left;
        width: 75%;
    }
    .right{
        width: 25%;
        float: right;
    }
    .edui-editor{
        width: 100%!important;
    }
    .edui-editor-iframeholder {
        width: 100%!important;
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
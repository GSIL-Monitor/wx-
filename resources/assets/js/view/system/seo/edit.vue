<template>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" v-loading="loading">

        <el-form-item label="名称" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="页面描述" prop="url">
            <el-input v-model="form.desc"></el-input>
        </el-form-item>

        <el-form-item label="页面关键字" prop="url">
            <el-input v-model="form.keywords"></el-input>
        </el-form-item>

        <el-form-item label="网页标题" prop="title">
            <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="close">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import form_page from '@/mixins/form_page'
    import {SeoGet,SeoEdit} from "@/api/nav";

    export default {
        name: "add",
        mixins: [form_page],
        props:['id'],
        data() {
            return {
                form: {
                    name: '',
                    desc: '',
                    keywords: '',
                    title: '',
                },
                rules: {
                    name: [
                        { required: true, message: '名称必须填写', trigger: 'blur' },
                    ],
                },
            }
        },
        created:function(){
            SeoGet(this.id).then(response=>{
                this.form = response.data.data
            })
        },
        methods: {
            onSubmit() {
                if (this.handleValid()){
                    this.handleSubmit(SeoEdit(this.id,this.form))
                }
            },
        }
    }
</script>

<style scoped>

</style>
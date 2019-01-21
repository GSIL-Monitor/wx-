<template>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" v-loading="loading">

        <el-form-item label="友链名称" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="友链地址" prop="url">
            <el-input v-model="form.url"></el-input>
            <span>链接请加上http://</span>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="close">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import form_page from '@/mixins/form_page'
    import {friend_add} from "@/api/friendLink";

    export default {
        name: "add",
        mixins: [form_page],
        data() {
            return {
                form: {
                    name: '',
                    url: '',
                },
                rules: {
                    name: [
                        { required: true, message: '友情链接名称必须填写', trigger: 'blur' },
                    ],
                    url: [
                        { required: true, message: '友情链接地址必须填写',trigger: 'blur'}
                    ],
                },
            }
        },
        methods: {
            onSubmit() {
                if (this.handleValid()){
                    this.handleSubmit(friend_add(this.form))
                }
            },
        }
    }
</script>

<style scoped>

</style>
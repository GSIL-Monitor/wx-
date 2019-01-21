<template>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" v-loading="loading">

        <el-form-item label="名称" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="链接地址" prop="link">
            <el-input v-model="form.link"></el-input>
        </el-form-item>

        <el-form-item label="seo配置" prop="seo_id">
            <el-select v-model="form.seo_id" clearable  placeholder="请选择,不选择为默认">
                <el-option
                        v-for="item in option"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="banner图片">
            <upload v-on:img-success="success"></upload>
        </el-form-item>
        <h2 style="color: red">{{tip}}</h2>
        <el-form-item v-for="(item, index) in form.nav_banner" :key="index"  :label="'图片' + (index+1)">
            <el-row >
                <el-col :span="8">
                    <img :src="item.banner_addr" style="width:120px;height: 87px;">
                    <el-input v-model="item.alt" placeholder="请输入图片描述信息"></el-input>
                    <el-input v-model="item.href" placeholder="请输入跳转地址"></el-input>
                </el-col>
                <el-col :span="14" :offset="1">
                    <el-button @click="handleEdit(index)">修改</el-button>
                    <el-button @click="handleclear()">清除状态</el-button>
                    <el-button @click="handleRemove(index)">移除</el-button>
                </el-col>
            </el-row>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="close">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import form_page from '@/mixins/form_page'
    import upload from '@/components/public/upload';
    import {NavAdd,SeoList} from "@/api/nav";

    export default {
        components:{
            upload
        },
        name: "add",
        mixins: [form_page],
        data() {
            return {
                sign:{operate:'',index:0},
                tip:'',
                form: {
                    name: '',
                    link: '',
                    seo_id: '',
                    nav_banner:[],
                },
                rules: {
                    name: [
                        { required: true, message: '名称必须填写', trigger: 'blur' },
                    ],
                    link: [
                        { required: true, message: '链接地址必须填写', trigger: 'blur' },
                    ],
                },
                option:[],
            }
        },
        created:function() {
            SeoList().then(response=>{
                let arr = [];
                response.data.data.forEach(item=>{
                    arr.push({label:item.name,value:item.id});
                });
                this.option = arr;
            })
        },
        methods: {
            onSubmit() {
                console.log(this.form);
                if (this.handleValid()){
                    this.handleSubmit(NavAdd(this.form))
                }
            },
            success(respon) {
                if (this.sign.operate == 'edit'){
                    this.$set(this.form.nav_banner,this.sign.index,{banner_addr:respon});
                    //清空操作状态
                    this.handleclear();
                } else{
                    this.form.nav_banner.push({banner_addr:respon});
                }
            },
            handleRemove (item) {
                this.form.nav_banner.splice(item,1);
            },
            handleEdit(item){
                this.tip ='图片'+(item+1) + '已变更为修改状态,现在上传图片为修改该图片内容';
                this.sign.operate = 'edit'; //变更图片操作状态
                this.sign.index = item; //表单索引
            },
            handleclear(){
                this.tip ='';
                this.sign.operate = ''; //变更图片操作状态
                this.sign.index = '';
            },
        }
    }
</script>

<style scoped>

</style>
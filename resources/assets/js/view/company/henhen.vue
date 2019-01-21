<template>
    <div style="width: 70%">
        <el-form ref="formDynamic" :model="formDynamic" label-width="100px">

            <el-form-item label="英文标头:" prop="english">
                <el-input v-model="formDynamic.english" placeholder="输入英文标头" ></el-input >
            </el-form-item>

            <el-form-item label="标题:" prop="title">
                <el-input  v-model="formDynamic.title" placeholder="标题" ></el-input >
            </el-form-item>

            <el-form-item label="描述:" prop="desc">
                <el-input  v-model="formDynamic.desc" placeholder="描述(首页展示)" ></el-input >
            </el-form-item>

            <el-form-item label="正文:" prop="content">
                <vue-ueditor-wrap :config="Ueconfig" v-model="formDynamic.content"></vue-ueditor-wrap>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleSubmit('formValidate')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import axios from '@/libs/axios';
    import VueUeditorWrap from 'vue-ueditor-wrap';
    export default {
        components:{
            VueUeditorWrap
        },
        data () {
            return {
                index: 1,
                formDynamic: {
                    english:'',
                    title:'',
                    content: '',
                    desc: '',
                    keyword: 'henhen',
                },
                configID:0,
                operation:"",
                Ueconfig:{
                    serverUrl: '/static/UEditor/php/controller.php'
                },
            }
        },
        created:function(){
            axios.get('/config',{params:{keyword: 'henhen'}}).
            then((response)=>{
                if (response.data.status) {
                    this.formDynamic = response.data.data;
                    //有数据走修改逻辑
                    this.operation = 'edit';
                    this.configID = response.data.data.id;
                }else {
                    //没数据走添加逻辑
                    this.operation = 'add'
                }
            });
        },
        methods: {
            handleAdd () {
                this.index = this.formDynamic.items.length+1;
                this.formDynamic.items.push(
                    {
                        address:'',
                        tel:'',
                        index: this.index,
                        status:1,
                    });
            },
            handleRemove (index) {
                this.formDynamic.items[index].status = 0;
                this.formDynamic.items.splice(index,1);
            },
            handleSubmit (name) {
                if (this.operation === 'edit') {
                    axios.patch('/config/'+this.configID,{
                        keyword:this.formDynamic.keyword,
                        value:this.formDynamic,
                        type:'json',
                    }).then((response)=> {
                        this.$message.info(response.data.message);
                    });
                }
                else {
                    axios.post('/config',{
                        keyword:this.formDynamic.keyword,
                        value:this.formDynamic,
                        type:'json',
                    }).then((response)=> {
                        this.$message.info(response.data.message);
                    });
                }
            },
        }
    }
</script>

<style>
    .edui-editor{
        width: 100%!important;
    }
    .edui-editor-iframeholder {
        width: 100%!important;
    }

</style>
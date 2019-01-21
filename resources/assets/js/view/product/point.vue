<template>
    <div style="width: 70%">
        <el-form ref="formDynamic" :model="formDynamic" label-width="100px">

            <el-form-item label="英文标头:" prop="english">
                <el-input v-model="formDynamic.english" placeholder="输入英文标头" ></el-input >
            </el-form-item>

            <el-form-item label="标题:" prop="title">
                <el-input  v-model="formDynamic.title" placeholder="标题" ></el-input >
            </el-form-item>

            <el-form-item label="简介:" prop="desc">
                <el-input  v-model="formDynamic.desc" placeholder="简介" ></el-input >
            </el-form-item>

            <template  v-for="(item, index) in formDynamic.items"  v-if="item.status">
                <el-form-item :label="'特点 ' + item.index">
                    <el-row>
                        <el-col :span="18">
                            <el-input  type="text" v-model="item.title"></el-input >
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <el-button @click="handleRemove(index)">移除</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item :label="'描述 ' + item.index">
                    <el-row>
                        <el-col :span="18">
                            <el-input  type="text" v-model="item.desc"></el-input >
                        </el-col>
                        <el-col :span="4" :offset="1">
                        </el-col>
                    </el-row>
                </el-form-item>
            </template>
            <el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-button type="dashed" long @click="handleAdd" icon="md-add">添加子项</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit('formValidate')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import axios from '@/libs/axios';
    export default {
        data () {
            return {
                index: 1,
                formDynamic: {
                    english:'',
                    title:'',
                    desc: '',
                    keyword: 'point',
                    items: [
                        {
                            index:1,
                            title:'',
                            desc:'',
                            status:1,
                        }
                    ],
                },
                configID:0,
                operation:"",
            }
        },
        created:function(){
            axios.get('/config',{params:{keyword: 'point'}}).
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
<template>
    <div style="width: 70%">
        <el-form ref="formDynamic" :model="formDynamic" label-width="100px">
            <el-form-item label="网站名称:" prop="title">
                <el-input v-model="formDynamic.site_name" placeholder="输入网站名称" ></el-input >
            </el-form-item>
            <el-form-item label="网站备案号:" prop="icp">
                <el-input  v-model="formDynamic.icp" placeholder="输入网站备案号" ></el-input >
            </el-form-item>
            <el-form-item label="联系电话:" prop="phone">
                <el-input  v-model="formDynamic.phone" placeholder="网站负责人联系电话" ></el-input >
            </el-form-item>
            <el-form-item label="服务热线:" prop="tel">
                <el-input  v-model="formDynamic.tel" placeholder="服务热线" ></el-input >
            </el-form-item>
            <el-form-item label="客服QQ:" prop="qq">
                <el-input  v-model="formDynamic.qq" placeholder="客服QQ" ></el-input >
            </el-form-item>
            <el-form-item label="邮编地址:" prop="postNum">
                <el-input  v-model="formDynamic.postNum" placeholder="邮编地址" ></el-input >
            </el-form-item>
            <template  v-for="(item, index) in formDynamic.items"  v-if="item.status">
                <el-form-item :label="'地址 ' + (index+1)">
                    <el-row>
                        <el-col :span="18">
                            <el-input  type="text" v-model="item.address"></el-input >
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <el-button @click="handleRemove(index)">移除</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item :label="'电话 ' + (index+1)">
                    <el-row>
                        <el-col :span="18">
                            <el-input  type="text" v-model="item.tel"></el-input >
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
            <template v-for="(itemJS, indexJS) in formDynamic.jsSlot">
                <el-form-item :label="'JS代码插槽 ' + (indexJS+1)" :key="indexJS">
                    <el-row>
                        <el-col :span="18">
                            <el-input  type="text" v-model="itemJS.code"></el-input >
                        </el-col>
                        <el-col :span="4">
                            <el-button @click="JShandleRemove(indexJS)">移除</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </template>
            <el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-button type="dashed" long @click="JShandleAdd" icon="md-add">添加子项</el-button>
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
                    site_name:'',
                    icp:'',
                    qq: '',
                    phone: '',
                    postNum: '',
                    tel: '',
                    // desc:'',
                    // site_keyword:'',
                    keyword: 'sitebase',
                    items: [
                        {
                            index:1,
                            address:'',
                            tel:'',
                            status:1,
                        }
                    ],
                    jsSlot: [
                        {
                            code:'',
                        }
                    ]
                },
                configID:0,
                operation:"",
            }
        },
        created:function(){
            axios.get('/config',{params:{keyword: 'sitebase'}}).
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
            JShandleAdd(){
                this.formDynamic.jsSlot.push({
                    code:''
                });
                this.$set(this.formDynamic.jsSlot,this.formDynamic.jsSlot);
            },
            handleRemove (index) {
             //   this.formDynamic.items[index].status = 0;
                this.formDynamic.items[index].status = 0;
                this.formDynamic.items.splice(index,1);
            },
            JShandleRemove (index) {

                let jsSlot = this.formDynamic.jsSlot.splice(index,1);
                this.$set(this.formDynamic.jsSlot,jsSlot);
                console.log(index,jsSlot);
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
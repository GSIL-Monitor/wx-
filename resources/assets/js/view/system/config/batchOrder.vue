<template>
    <div style="width: 30%;">
        <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
            <el-form-item label="状态">
                <el-select v-model="sizeForm.status" placeholder="请选择">
                    <el-option
                            v-for="item in option"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="限定数量">
                <el-input v-model="sizeForm.number" placeholder="请输入限定数量"></el-input>
                <span style="color: red">同一手机和IP一天可以下几次订单</span>
            </el-form-item>
            <el-form-item size="large">
                <el-button type="primary" @click="onSubmit">保存配置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                option:[
                    {
                        label:'关闭',
                        value:'0'
                    },
                    {
                        label:'开启',
                        value:'1'
                    }
                ],
                sizeForm: {
                    status: '0',
                    number: '2',
                }
            };
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped>

</style>
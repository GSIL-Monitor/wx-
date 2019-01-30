<template>
    <div style="width: 30%;">
        <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
            <el-form-item label="appId">
                <el-input v-model="sizeForm.appid" placeholder="请输入appId"></el-input>
            </el-form-item>
            <el-form-item label="secret密匙">
                <el-input v-model="sizeForm.secret" placeholder="请输入appId对应的密匙"></el-input>
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
                sizeForm: {
                    appid: '',
                    secret: '',
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
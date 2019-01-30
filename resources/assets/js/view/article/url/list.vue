<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="主库域名" name="first">
            <first></first>
        </el-tab-pane>
        <el-tab-pane label="备用域名" name="second">
            <back></back>
        </el-tab-pane>
        <el-tab-pane label="封禁域名" name="third">
            <forbid></forbid>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
    import first from './main'
    import back from './backups'
    import forbid from './forbid'
    export default {
        components: {first, back, forbid},
        data() {
            return {
                activeName: 'first'
            };
        },
    };
</script>
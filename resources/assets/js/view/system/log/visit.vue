<template>
    <div>
        <div style="width: 35%;margin-bottom: 15px;">
            <el-input placeholder="请输入要搜索的内容..." size="small" v-model="search.value" class="input-with-select">
                <el-select style="width: 110px;" size="small" v-model="search.field" slot="prepend"
                           placeholder="请选择">
                    <el-option v-for="item in columns" :key="item.prop" v-if="item.search" :label="item.label"
                               :value="item.prop"></el-option>
                </el-select>
                <el-button size="small" slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
            </el-input>
        </div>


        <Table ref="table" :url="url" :columns="columns" :checkbox="false"></Table>
    </div>
</template>

<script>
    import Table from "@/components/public/table";
    import list_page from "@/mixins/list_page";

    export default {
        name: "visit",
        components: {Table},
        mixins: [list_page],
        data() {
            return {
                url: "visit",
                columns: [
                    {
                        prop: 'id',
                        label: 'ID',
                        width: '80',
                        sort: true,
                    },
                    {
                        prop: 'ip',
                        label: '来源IP',
                        search: true,
                    },
                    {
                        prop: 'created_at',
                        label: '访问时间',
                        search: true,
                    },
                    {
                        prop: 'system_type',
                        label: '系统及型号',
                        search: true,
                    },
                    {
                        prop: 'event',
                        label: '触发事件',
                        search: true,
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>
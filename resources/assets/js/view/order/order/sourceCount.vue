<template>
    <div>
        <Table :url="url" :columns="columns"></Table>
    </div>
</template>

<script>
    import Table from "@/components/public/table";
    import list_page from "@/mixins/list_page";
    export default {
        name: "sourceCount",
        components: {Table},
        mixins: [list_page],
        data(){
            return {
                columns:[
                    {}
                ],
                url:'source/count'
            }
        }
    }
</script>

<style scoped>

</style>
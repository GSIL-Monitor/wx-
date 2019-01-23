// 商品订单管理
export default [
    {
        path: '/source',name:'source', component:resolve=>require(['@/view/order/source/source_manage'],resolve)
    },
    {
        path: '/publish_goods',name:'publish_goods', component:resolve=>require(['@/view/order/publish_goods/publish_goods'],resolve)
    },
    {
        path: '/goods_list',name:'goods_list', component:resolve=>require(['@/view/order/goods/list'],resolve)
    },
    {
        path: '/edit_goods',name:'edit_goods', component:resolve=>require(['@/view/order/publish_goods/edit_goods'],resolve)
    },


]
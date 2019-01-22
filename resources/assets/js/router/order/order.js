// 商品订单管理
export default [
    {
        path: '/source',name:'source', component:resolve=>require(['@/view/order/source/source_manage'],resolve)
    },
    {
        path: '/publish_goods',name:'publish_goods', component:resolve=>require(['@/view/order/publish_goods/publish_goods'],resolve)
    },
]
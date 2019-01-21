// 系统设置模块
export default [
    {
        path: '/menu',name:'menu', component:resolve=>require(['@/view/system/menu/menu'],resolve)
    },
    {
        path: '/friendlink',name:'friendlink', component:resolve=>require(['@/view/system/FriendLink/FriendLink'],resolve)
    },
    {
        path: '/sitebase',name:'sitebase', component:resolve=>require(['@/view/system/sitebase/sitebase'],resolve)
    },
    {
        path: '/product',name:'product', component:resolve=>require(['@/view/product/product'],resolve)
    },
    {
        path: '/point',name:'point', component:resolve=>require(['@/view/product/point'],resolve)
    },
]
// 公司介绍
export default [
    {
        path: '/company',name:'company', component:resolve=>require(['@/view/company/company'],resolve)
    },
    {
        path: '/henhen',name:'henhen', component:resolve=>require(['@/view/company/henhen'],resolve)
    },
]
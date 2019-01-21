// 网站反馈,预约体验 路由
export default [
    {
        path: '/contact',name:'contact', component:resolve=>require(['@/view/contact/contact'],resolve)
    },
    {
        path: '/order',name:'order', component:resolve=>require(['@/view/contact/order'],resolve)
    },
]
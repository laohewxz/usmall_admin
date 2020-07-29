import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/index"
Vue.use(Router)

function power(url){
    return store.state.user.menus_url.some(i=>i==url)
}

const router=new Router({
    routes: [{
        path: '/',
        component: () =>
            import("../pages/index/index.vue"),
        children: [
            {
                path: "home",
                component: () => import("../pages/home/home.vue"),
                nam:"首页"
            },
            {
                path: "banner",
                component: () => import("../pages/banner/banner.vue"),
                name:"轮播图列表",
                beforeEnter(to,from,next){
                    power("/banner")?next():next('/home')
                }
            },
            {
                path: "cate",
                component: () => import("../pages/cate/cate.vue"),
                name:"商品分类列表",
                beforeEnter(to,from,next){
                    power("/cate")?next():next('/home')
                }
            },
            {
                path: "goods",
                component: () => import("../pages/goods/goods.vue"),
                name: "商品列表",
                beforeEnter(to,from,next){
                    power("/goods")?next():next('/home')
                }
            },
            {
                path: "manage",
                component: () => import("../pages/manage/manage.vue"),
                name:"管理员列表",
                beforeEnter(to,from,next){
                    power("/manage")?next():next('/home')
                }
            },
            {
                path: "member",
                component: () => import("../pages/member/member.vue"),
                name:"会员列表",
                beforeEnter(to,from,next){
                    power("/member")?next():next('/home')
                }
            },
            {
                path: "menu",
                component: () => import("../pages/menu/menu.vue"),
                name:"菜单列表",
                beforeEnter(to,from,next){
                    power("/menu")?next():next('/home')
                }
            },
            {
                path: "role",
                component: () => import("../pages/role/role.vue"),
                name:"角色列表",
                beforeEnter(to,from,next){
                    power("/role")?next():next('/home')
                }
            },
            {
                path: "seckill",
                component: () => import("../pages/seckill/seckill.vue"),
                name:"秒杀列表",
                beforeEnter(to,from,next){
                    power("/seckill")?next():next('/home')
                }
            },
            {
                path: "spec",
                component: () => import("../pages/spec/spec.vue"),
                name:"商品规格列表",
                beforeEnter(to,from,next){
                    power("/spec")?next():next('/home')
                }
            },
            {
                path:'',
                redirect:"home"
            }
        ]
    },
    {
        path: '/login',
        component: () =>
            import("../pages/login/login.vue"),

    },
    ]
})


//登录拦截
router.beforeEach((to,from,next)=>{
    if(to.path==="/login"){//允许前往登录页
        next();
        return
    }
    if(store.state.user){
        next();
        return
    }
    next("/login")
})
export default router
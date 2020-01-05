import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const baseRouter = [
    {
        path: '/',
        redirect: '/Login',
        hidden: true
    },
    {
        path: '/Login',
        name: 'Login',
        hidden: true,
        component: resolve => {
            require(['@/pages/Login.vue'], resolve)
        },
    },

]

function createRouter() {
    return new Router({ routes: baseRouter })
}

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}


export default router
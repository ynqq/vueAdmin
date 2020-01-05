import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/reset.css'
import '../static/css/globalDefault.css'
import axios from './utils/axios'
import { AJAXIP, upData } from './utils/axiosIP'
import store from './store'
import '@/symbol/font/iconfont.js'

import NProgress from "nprogress"
import "nprogress/nprogress.css"

Vue.prototype.$axios = axios
Vue.prototype.$axiosip = AJAXIP
Vue.prototype.upData = upData

Vue.config.productionTip = false
Vue.use(ELEMENT, { size: 'small', zIndex: 3000 })


router.beforeEach((to, from, next) => {
    NProgress.start()
    // if(to.path !== '/Login'){
    //     if(sessionStorage.LOGIN_STATE !== '1'){
    //         next({
    //             path: "/Login",
    //             replace: true,
    //         })
    //     }
    // }
    if(to.meta.keepAlive){
        store.dispatch('permission/toggleCachList', {
            name: to.name,
            type: 1
        })
    }
    if (to.path !== '/Login' || to.path !== '/404') {
        store.commit('SET_NOWROUTER', to)
    }
    if (store.getters['permission/get_routes'] && store.getters['permission/get_routes'].length == 0) {
        store.dispatch('permission/getRoutes')
        next({...to, replace: true})
    }
    next()
})

router.afterEach((to, from) => {
    NProgress.done()
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
})
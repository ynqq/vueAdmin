import router, { baseRouter, resetRouter } from "../../router/index"
import adminRouters from "../../router/module/admin"
import nofoundModel from "../../router/module/404"

export function filterRoutes(routes, roles) {
    let result = []
    let permission = sessionStorage.PermissionType
    if (permission != undefined) {
        routes.map((v) => {
            result.push(v)
            // if (v.meta.permission === undefined || v.meta.permission === Number(permission)) {
            //     result.push(v)
            // }
        })
    }
    return routes
    // return result
}

export default {
    namespaced: true,
    state: {
        routes: [],
        cachList: ["Home"]
    },
    getters: {
        get_routes(state) {
            return state.routes
        },
        get_cachList(state){
            return state.cachList
        }
    },
    mutations: {
        SET_ROUTES(state, routes) {
            state.routes = baseRouter.concat(routes)
        },
        ADD_CACHLIST(state, values){
            if(!state.cachList.includes(values)){
                state.cachList.push(values)
            }
        },
        DEL_CACHLIST(state, values){
            state.cachList.splice(state.cachList.indexOf(values), 1)
        }

    },
    actions: {
        getRoutes({ commit }) {
            return new Promise((resolve, reject) => {
                let nowRoutes = filterRoutes(adminRouters)
                commit('SET_ROUTES', nowRoutes)
                resetRouter()
                router.addRoutes(nowRoutes)
                resolve()
            })
        },
        getLoginOutRouter({ commit }) {
            return new Promise((resolve, reject) => {
                commit('SET_ROUTES', [...nofoundModel])
                resetRouter()
                router.addRoutes([...nofoundModel])
                resolve()
            })
        },
        /**
         * 
         * @param {*} name 
         * @param {*} type 1 -> 新增 0 -> 删除 
         */
        toggleCachList({commit}, {
            name,
            type
        }){
            if(type === 1){
                commit('ADD_CACHLIST', name)
            }else{
                commit('DEL_CACHLIST', name)
            }
        }
    }
}
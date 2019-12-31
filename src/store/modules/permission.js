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
    },
    getters: {
        get_routes(state) {
            return state.routes
        }
    },
    mutations: {
        SET_ROUTES(state, routes) {
            state.routes = baseRouter.concat(routes)
        },
        change(state, n) {
            state.ttt = n
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
        }
    }
}
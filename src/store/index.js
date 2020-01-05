import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

const fileList = require.context('./modules', true, /\.js$/)


const moduleList = fileList.keys().reduce((modules, filepath) => {
    const name = filepath.replace(/^\.\/(.*)\.\w+$/, '$1')
    modules[name] = fileList(filepath).default
    return modules
}, {})

export default new vuex.Store({

    state: {
        nowRouter: {},
    },
    mutations: {
        SET_NOWROUTER(state, val) {
            state.nowRouter = val || {}
        }
    },
    modules: moduleList
})
import axios from 'axios'
import qs from 'qs'
import { AJAXIP } from './axiosIP'
const ajax = axios.create({
    timeout: '10000',
})
import router from "../router/index"

// axios拦截器
ajax.interceptors.request.use(config => {
    if (config.method == 'post') {
        if (typeof config.data == 'string') {
        } else {
            config.data = qs.stringify(config.data)
        }
        return config
    } else {
        return config
    }
})

export default function ({
    url = '',
    ip = AJAXIP,
    data,
    type = 'POST',
    header = {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
}) {
    return new Promise((resolve, reject) => {
        if (sessionStorage.ManagerCode) {
            var sessionStr = '?SessionCode=' + sessionStorage.ManagerCode
            if (url.indexOf('?') != -1) {
                url = url.split('?')[0] + sessionStr + '&' + url.split('?')[1]
            } else {
                url = url + sessionStr
            }
        }
        ajax({
            url: ip + url,
            data,
            method: type,
            headers: header,
        })
            .then(res => {
                if (res.data.sessionFlag === '0') {
                    sessionStorage.removeItem('LOGIN_STATE')
                    return router.replace('/Login')
                }
                resolve(res.data)
            })
            .catch(() => {
                reject()
            })
    })
}
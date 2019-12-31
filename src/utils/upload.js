import axios from "axios"
import qs from "qs"
import { upData } from "./axiosIP"


export default function ({
    ip = upData,
    url = '',
    data
}) {
    return new Promise((resolve, reject) => {
        let config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            }
        };
        if (sessionStorage.ManagerCode) {
            var sessionStr = '?SessionCode=' + sessionStorage.ManagerCode
            if (url.indexOf('?') != -1) {
                url = url.split('?')[0] + sessionStr + '&' + url.split('?')[1]
            } else {
                url = url + sessionStr
            }
        }
        axios.post(
            url= ip + url,
            data,
            config
        ).then(res => {
            resolve(res.data)
        }).catch(() => {
            reject()
        })
    })
}
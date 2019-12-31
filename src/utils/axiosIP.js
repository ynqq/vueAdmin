
let ip = 'http://localhost:8080/'

if (window.location.protocol === 'https:') {
    ip = ip.replace('http:', 'https:')
}

let AJAXIP = ip
let upData = ip

export { AJAXIP, upData }



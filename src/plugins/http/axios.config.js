import axios from "axios"
const instance = axios.create({
    timeout: 60000
})

window.axios = axios //avue需要用到
// 请求前拦截
instance.interceptors.request.use(
    config => {
        // const temp = Object.keys(config.headers).includes("Blade-Auth")
        // if (temp) {
        //     !config.headers["Blade-Auth"] && delete config.headers["Blade-Auth"]
        // } else {
        //     config.headers["Blade-Auth"] = getToken()
        // }
        // config.headers = Object.assign(temp, config.headers)
        return config
    },
    err => {
        return Promise.resolve(err)
    }
)


// 返回后拦截
instance.interceptors.response.use(
    res => {
        const data = res.data
        return data
    },
    err => {
        return Promise.reject(err)
    }
)

export default instance

import instance from "./axios.config.js"
const request = config => instance.request(config)

/**
 * post请求
 * @param {*} url 请求地址
 */
/**
 * get请求
 * @param {*} url 请求地址
 * @param {*} params 参数
 */

const get = (url, params = {}) => {
    return request({
        method: "get",
        url,
        params,
    })
}


const post = (
    url,
    data = {},
    contentType = "application/json",
) => {

    const headers = {
        "Content-Type": contentType
    }
    return request({
        method: "post",
        url,
        data,
        headers: headers,
    })
}
export default {
    get,
    post
}

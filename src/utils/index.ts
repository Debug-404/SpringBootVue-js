import axios from "axios"
import {getToKen} from "@/utils/tokenUtils";

const request = axios.create({
    baseURL: "api",
    timeout: 5000,
    headers: {"Content-Type": "application/json"}
})

// 添加请求拦截器
request.interceptors.request.use(
    (request) => {
        if (getToKen()) {
            request.headers.token = getToKen()
        }
        return request
    }, (error) => {
        return Promise.reject(error)
    })

// 添加响应拦截器
request.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default request
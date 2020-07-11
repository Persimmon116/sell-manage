

// 引入axios
import axios from "axios";

// 引入qs
import qs from 'qs';

// 引入本地存储
import local from './local'
import { Message } from "element-ui";



// 服务器地址
axios.defaults.baseURL = "http://127.0.0.1:5000";
// 超时响应
axios.defaults.timeout = 4000;

// 请求拦截
axios.interceptors.request.use((config) => {
    let token = local.get("token") || ""; // 取出本地token 
    if (token) {
        config.headers.Authorization = token; // 统一在请求头携带token
    }
    return config;
});
// 响应拦截
axios.interceptors.response.use((response) => {
    // 如果有code 和 message
    if (response.data.code !== undefined && response.data.msg !== undefined) {
        let { code, msg } = response.data; // 取出code 和 msg

        if (code === 0) {
            // 成功
            Message({ type: "success", message: msg });
        } else if (code === 1) {
            // 失败
            Message.error(msg);
        }
    }
    return response;
});
// get和post请求
export default {
    // get
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, { params })
                // 成功
                .then(response => {
                    resolve(response.data);
                })
                // 失败
                .catch(err => {
                    reject(err)
                })
        })
    },
    // post
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params))
                // 成功
                .then(response => {
                    resolve(response.data);
                })
                // 失败
                .catch(err => {
                    reject(err)
                })
        })
    }
}
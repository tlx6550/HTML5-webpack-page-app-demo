/**
 * Created by issuser on 2018/9/25 0025.
 */
import axios from './axios.min.js';


// 创建axios实例

const service = axios.create({
    /* baseURL: process.env.BASE_API, */
    timeout: 5000, // 请求超时时间
    headers:{
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: false,
    method:'post',
})

let loadingInstance = null
// request拦截器
service.interceptors.request.use(config => {
    /*  if (store.getters.token) {
        config.headers['token'] = getToken() // 让每t个请求携带自定义token 请根据实际情况自行修改
    } */
    return config;
}, error => {
    // Do something with request error
    console.log(error) ;// for debug
    Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        const res = response.data
        // loadingInstance.close();
        return Promise.resolve(res);

    },
    error => {
        return Promise.reject(error);
    }
)

export default service;

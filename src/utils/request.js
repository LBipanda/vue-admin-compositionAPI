import axios from 'axios';
import { Message } from 'element-ui';
import app from '@/utils/app';


// 创建axios
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';
const service = axios.create({
    baseURL: BASEURL, // http://10.68.216.186:8080/devApi/ == http://www.web-jshtml.cn/productapi
    timeout: 10000
})

// console.log(process.env.VUE_APP_LB)

// console.log(process.env.NODE_ENV)
// 添加请求拦截器
service.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    config.headers['tokey'] = app.getToken()
    config.headers['UserName'] = app.getUserName()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use((response) => {
    if(response.data.resCode != '0'){
        Message.error(response.data.message)
        return Promise.reject(response);
    }else{
        return response
    }
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service;
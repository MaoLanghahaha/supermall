import axios from "axios";

export function request (config) {
  // 1、创建实例
  const axios_instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })
  // 2、配置request拦截器
  axios_instance.interceptors.request.use(config => {
    // 1、config中的一些信息不符合服务器要求，需做一些转换
    // 2、发送网络请求时显示加载动画
    // 3、某些请求，例如用户登录必须携带Token，在此可做拦截判断
    return config;
  }, err => {
    return Promise.reject(err);
  })
  // 3、配置response拦截器
  axios_instance.interceptors.response.use(res => {
    // 1、处理返回结果，过滤掉不需要的数据
    // 2、关闭加载动画
    return res.data;
  }, err => {
    return Promise.reject("response err", err);
  })
  // 4、返回axios实例（axios实例是一个Promise）
  return axios_instance(config);
}

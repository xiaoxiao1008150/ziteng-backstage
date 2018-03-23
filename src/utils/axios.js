import axios from 'axios';
import { Message } from 'element-ui';
// import qs from "qs"
// import store from '@/store'
// import { getToken } from '@/utils/auth'
import Vue from 'vue';
// create an axios instance
var CancelToken = axios.CancelToken;
var cancel;

const service = axios.create({
  baseURL: 'http://47.93.236.101:8888', // api的base_url
  // baseURL: 'http://192.168.111.127:8888', // api的base_url
  // baseURL: 'http://192.168.88.224:8888', // api的base_url
  timeout: 5000,// request timeout
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    cancel = c;
  })
});

let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removePending = (config) => {
    for(let p in pending){
        if(pending[p].u === config.url + '&' + config.method) { //当当前请求在数组中存在时执行函数体
            pending[p].f(); //执行取消操作
            pending.splice(p, 1); //把这条记录从数组中移除
        }
    }
}
// request interceptor
service.interceptors.request.use(config => {
  // cancel()
  // removePending(config)
  // pending.push({ u: config.url + '&' + config.method, f: cancel });
  console.log('pending',pending)
  // console.log('config', config);
  config.headers = {
    'Content-Type':'application/x-www-form-urlencoded'
  };
  // Do something before request is sent
  // if (store.getters.token) {
  //   config.headers['X-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  // }
  return config;
}, error => {
  // Do something with request error
  console.log('request_error', error); // for debug

  Promise.reject(error);
});

// respone interceptor
service.interceptors.response.use(
  response => {
    // removePending(response.config);  //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除 
    return response;
  },
  error => {
    console.log('err' + error);;// for debug
    Message({
      message: '请稍后尝试',
      type: 'error',
      duration: 2* 1000
    });
    // removePending(res.config);  //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除 
    return Promise.reject(error);
  });

export default service;

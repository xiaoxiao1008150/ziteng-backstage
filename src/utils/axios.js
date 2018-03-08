import axios from 'axios'
import { Message } from 'element-ui'
// import qs from "qs"
// import store from '@/store'
// import { getToken } from '@/utils/auth'
import Vue from 'vue'
// create an axios instance
const service = axios.create({
  baseURL: 'http://47.93.236.101:8888', // api的base_url
  // baseURL: 'http://192.168.31.241:8888', // api的base_url
  // baseURL: 'http://192.168.88.224:8888', // api的base_url
  timeout: 5000,// request timeout
});



// request interceptor
service.interceptors.request.use(config => {
  // cancel()
  console.log('config', config)
    
  config.headers = {
    'Content-Type':'application/x-www-form-urlencoded'
  }
  // Do something before request is sent
  // if (store.getters.token) {
  //   config.headers['X-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  // }
  return config
}, error => {
  // Do something with request error
  console.log('request_error', error) // for debug

  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error)// for debug
    Message({
      message: '请稍后尝试',
      type: 'error',
      duration: 2* 1000
    })
    return Promise.reject(error)
  })

export default service

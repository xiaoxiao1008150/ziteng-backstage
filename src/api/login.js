import request from 'utils/axios'

// http://192.168.31.241:8888/marketing/api/login?_loginName=13029499224&_password=123456&_verCode=888999
export function login(data) {
  return request({
    url: `/marketing/api/login?${data}`,
    method: 'post'
    // data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user',
    method: 'get',
    params: { token }
  })
}


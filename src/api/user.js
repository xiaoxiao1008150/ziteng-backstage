import http from 'utils/axios'

// 获取user列表
export function fetchUsers() {
  return http({
    url: '/user',
    method: 'get'
  })
}

export function createUser(data) {
  return http({
    url: '/user',
    method: 'post',
    data
  })
}
//user登录post
export function Login(data) {
  return http({
    url: '/user',
    method: 'post',
    data
  })
}

import request from 'utils/axios'

export function loginByUsername(tel, password,captcha) {
  const data = {
    tel,
    password,
    captcha
  }
  return request({
    url: '/user/1',
    method: 'get'
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


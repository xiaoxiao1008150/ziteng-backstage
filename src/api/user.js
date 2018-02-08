import http from 'utils/axios'

// 获取user列表 _status ="1,2,3"
export function fetchUsers(data) {
  return http({
    url: '/user',
    method: 'post',
    data
  })
}

// 获取user列表 单一状态 _status = 0
export function fetchUserByStatus(data) {
  return http({
    url: '/user',
    method: 'post',
    data
  })
}

export function createUser(data) {
  return http({
    url: '/user',
    method: 'post',
    data
  })
}

//短信验证码post 手机号码

export function getCaptcha(data) {
  return http({
    url: '/sms/verifyCode',
    method: 'post',
    data
  })
}


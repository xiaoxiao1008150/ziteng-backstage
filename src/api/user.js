import http from 'utils/axios'

// 获取user列表 只是注册过的用户 客户审核->待审核
//http://192.168.31.241:8888/marketing/userClient/getUserByStatus
export function fetchUserByStatusNum(num) {
  let data = {_status: num}
  return http({
    url: '/user',
    method: 'post',
    data
  })
}

// 获取user列表 所有状态
// http://192.168.31.241:8888/marketing/userClient/getUserWithStatus
export function fetchUser(data) {
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


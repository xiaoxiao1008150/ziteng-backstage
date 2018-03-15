import http from 'utils/axios'

// 获取user列表 只是注册过的用户 客户审核->待审核
//http://192.168.31.241:8888/marketing/userClient/getUserByStatus
export function fetchUserList() {
  return http({
    url: '/marketing/userClient/getUserByStatus?_status=0',
    method: 'post'
  })
}
// http://192.168.31.241:8888/marketing/userClient/getUserWithStatus
// 获取所有状态的客户列表
export function fetchAllUser() {
  return http({
    url: `/marketing/userClient/getUserWithStatus?_status=1,2,3`,
    method: 'post'
  })
}

// http://192.168.31.241:8888/marketing/userClient/editUser
//data{startTime=2012-10-22 00:00:00  status=0 expiredTime=2012-10-23 00:00:00  id=}
export function userEdit(data) {
  return http({
    url: `/marketing/userClient/editUser?${data}`,
    method: 'post',
  })
}

// http://192.168.31.241:8888/marketing/userClient/rejectUser
export function userReject(id) {
  return http({
    url: `/marketing/userClient/rejectUser?_userId=${id}`,
    method: 'post'
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

// 用户注册
export function createUser(data) {
  return http({
    url: `/marketing/userClient/createUser?${data}`,
    method: 'post',
  })
}

//短信验证码post 手机号码

export function getCaptcha(data) {
  return http({
    url: `/marketing/api/register/send?phoneNumber=${data}`,
    method: 'post',
  })
}


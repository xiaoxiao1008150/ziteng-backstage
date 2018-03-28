import http from 'utils/axios'
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

// 个人中心 修改联系人 需要对
export function updateContact(data) {
  return http({
    url: `/marketing/api/register/send?phoneNumber=${data}`,
    method: 'post',
  })
}
// 个人中心 修改手机号码 需要对
export function updateTel(data) {
  return http({
    url: `/marketing/api/register/send?phoneNumber=${data}`,
    method: 'post',
  })
}

// 个人中心 修改登录密码 需要对
export function updatePassword(data) {
  return http({
    url: `/marketing/api/register/send?phoneNumber=${data}`,
    method: 'post',
  })
}
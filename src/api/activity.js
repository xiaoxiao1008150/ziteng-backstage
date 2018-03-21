import http from 'utils/axios'

// 获取模板数据
export function getTemplates() {
  return http({
    url: `/marketing/templateClient/getTemplates`,
    method: 'post',
  })
}

// http://47.93.236.101:8888/marketing/activityClient/updateInfo
export function updateActivity(data) {
  return http({
    url: `/marketing/activityClient/updateInfo?${data}`,
    method: 'post',
  })
}
// 创建活动 192.168.31.241:9999/activityClient/createInfo?
export function createActivity(data) {
  return http({
    url: `/marketing/activityClient/createInfo?${data}`,
    method: 'post',
  })
}


// //  获取活动审核 待审核 列表
// export function fetchVerfityList() {
//   return http({
//     url: `/user`,
//     method: 'post',
//   })
// }

// // 获取所有客户的活动列表，包括所有状态
// export function fetchActivityListAll() {
//   return http({
//     url: `/user`,
//     method: 'post',
//   })
// }

// // 待审核  操作 通过
// export function activityPassVerfity(data) {
//   return http({
//     url: `/user`,
//     method: 'post',
//   })
// }

// // 待审核  操作 拒绝
// export function activityReject(data) {
//   return http({
//     url: `/user`,
//     method: 'post',
//   })
// }
// //客户列表 操作 开始
// export function activityStart(data) {
//   return http({
//     url: `/user`,
//     method: 'post',
//   })
// }

// //客户列表 操作 暂停
// export function activityPause(data) {
//   return http({
//     url: `/user`,
//     method: 'post',
//   })
// }
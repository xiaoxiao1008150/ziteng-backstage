import http from 'utils/axios'

// 活动管理 获取列表
export function activityManageList() {
  return http({
    url: `/marketing/activityClient/show`,
    method: 'post',
  })
}

// 活动管理  发布操作
export function activityPublish(data) {
  return http({
    url: `/marketing/activityClient/editInfo?${data}`,
    method: 'post',
  })
}

// 活动管理  编辑操作
export function activityEdit(data) {
  return http({
    url: `/marketing/activityClient/showOne?activityId=${data}`,
    method: 'post',
  })
}


//  获取活动审核 待审核 列表
export function fetchVerfityList() {
  return http({
    url: `/marketing/activityClient/getActivityWithStatus?_status=0`,
    method: 'post',
  })
}



// 获取所有客户的活动列表，包括所有状态
export function fetchActivityListAll() {
  return http({
    url: `/marketing/activityClient/getActivityWithStatus?_status=[0,1,2,3,4,5,6]`,
    method: 'post',
  })
}
// 活动审核 状态变化
export function changeStatus(data) {
  return http({
    url: `/marketing/activityClient/editInfo?${data}`,
    method: 'post',
  })
}
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
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
    url: `/marketing/activityClient/showOne?_activityId=${data}`,
    method: 'post',
  })
}


//  获取活动审核 待审核 列表
export function fetchVerfityList() {
  return http({
    url: `/marketing/activityClient/getActivityWithStatus?_status=1`,
    method: 'post',
  })
}



// 获取所有客户的活动列表，包括所有状态
export function fetchActivityListAll() {
  return http({
    url: `/marketing/activityClient/getActivityWithStatus?_status=0,2,3,4,5,6,9`,
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
//  待审核  查看
export function fetchInfoList(data) {
  return http({
    url: `/user`,
    method: 'post',
  })
}

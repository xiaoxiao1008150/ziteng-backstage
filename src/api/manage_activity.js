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

// 活动管理  操作 查看 
export function fetchInfoList(data) {
  return http({
    url: `/user`,
    method: 'post',
  })
}
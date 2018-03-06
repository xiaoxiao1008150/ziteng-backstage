import http from 'utils/axios'

// 活动管理 获取列表
export function activityManageList(data) {
  return http({
    url: `/user`,
    method: 'post',
  })
}

// 活动管理  发布操作
export function activityPublish(data) {
  return http({
    url: `/user`,
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
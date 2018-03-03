import http from 'utils/axios'

// 创建活动 192.168.31.241:9999/activityClient/createInfo?
export function createActivity(data) {
  return http({
    url: `/marketing/activityClient/createInfo?`,
    method: 'post',
    data
  })
}


//  测试url   先保存
export function fetchInfoList() {
  return http({
    url: `/user`,
    method: 'get',
  })
}

// 获取所有客户的活动列表，包括所有状态
export function fetchActivityList() {
  return http({
    url: `/user`,
    method: 'post',
  })
}

// 获取所有客户的活动列表，只是待审核的
export function fetchActivityByStatus() {
  return http({
    url: `/user`,
    method: 'post',
  })
}
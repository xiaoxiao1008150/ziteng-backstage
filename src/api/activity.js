import http from 'utils/axios'

//  测试url x  先保存
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
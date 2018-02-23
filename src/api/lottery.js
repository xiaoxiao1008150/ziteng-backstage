import http from 'utils/axios'

// 获取user列表 只是注册过的用户 客户审核->待审核
//http://192.168.31.241:8888/marketing/userClient/getUserByStatus
export function fetchInfoList() {
  return http({
    url: `/user`,
    method: 'get',
  })
}


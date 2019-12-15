/*
 * 代码表管理接口
 */
import request from '@/libs/request'

// 地区模糊查询
export function queryDistrict(data = {}) {
  return request({
    url: '/v1/system/queryDistrict',
    method: 'get',
    params: data
  })
}
// 项目配置表Map查询
export function getSystemConfig(data = {}) {
  return request({
    url: '/v1/system/getSystemConfig',
    method: 'get',
    params: data
  })
}

// 查询消息数量
export function getMessageCount(data = {}) {
  return request({
    url: '/v1/system/getMessageCount',
    method: 'get',
    data: data
  })
}

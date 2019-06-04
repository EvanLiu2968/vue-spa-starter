/*
 * 代码表管理接口
 */
import request from '@/libs/request'
// 籍贯出生地模糊查询
export function searchNativePlace(data = {}) {
  return request({
    url: '/cas/sysCode/listRegionSysCode',
    method: 'get',
    params: data
  })
}
// 项目代码表Map查询（除出生地）
export function searchSysCodeCategory(data = {}) {
  return request({
    url: '/cas/sysCodeCategory/searchSysCodeCategory',
    method: 'get',
    params: data
  })
}

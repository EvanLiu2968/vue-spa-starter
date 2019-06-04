/*
 * 档案管理_统计分析
 */
import request from '@/libs/request'

// 档案统计
export function getArchOverview(data = {}) {
  return request({
    url: '/cas/fileStatistics/fileStatistics',
    method: 'get',
    params: data
  })
}
// 1-档案业务(接收,转递,入库) 2-材料业务
export function getArchBusinessData(data = {}) {
  data.type = data.type || '1'
  if (data.type == '1') {
    return request.get('/cas/fileStatistics/fileOperations', { params: data })
  } else if (data.type == '2') {
    return request.get('/cas/fileStatistics/materialBusiness', { params: data })
  }
}
// 库存统计 1-库存正副本 2-有档人员档案情况
export function getInventoryData(data = {}) {
  data.type = data.type || '1'
  if (data.type == '1') {
    return request.get('/cas/fileStatistics/inventory', { params: data })
  } else if (data.type == '2') {
    return request.get('/cas/fileStatistics/inventoryStaff', { params: data })
  }
}

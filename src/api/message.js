/*
 * 档案管理_消息提醒
 */
import request from '@/libs/request'

// 查询消息列表 type:0待办 1已办 2消息
export function getMessageList(type, data = {}) {
  if (type === 2) {
    return request({
      url: '/cas/messageAlert/selectMessageAlertList',
      method: 'post',
      showLoading: true,
      data: data
    })
  } else {
    return request({
      url: '/cas/affairCommission/selectAffairCommission',
      method: 'post',
      showLoading: true,
      data: data
    })
  }
}
// 查询消息数量
export function getMessageCount(data = {}) {
  return request({
    url: '/cas/messageAlert/selectMessageAlertCount',
    method: 'get',
    data: data
  })
}
// 查询首页消息看板
export function getDashboardMessage(data = {}) {
  return request({
    url: '/cas/affairCommission/homePageDisplay',
    method: 'get',
    data: data
  })
}
// 更改消息提醒的状态
export function updateMessageAlert(type, id) {
  if (type === 2) {
    return request.post(`/cas/messageAlert/updateMessageAlert/${id}`)
  } else {
    return request.post(`/cas/affairCommission/updateAffairCommission/${id}`)
  }
}

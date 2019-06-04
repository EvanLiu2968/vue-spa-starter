/*
 * 机构/人员增删改查、标签管理
 */
import request from '@/libs/request'
/*
 * 标签管理
 */
// 查询标签
export function getStaffLabelList(data = {}) {
  return request({
    url: '/cas/admin/getStaffLabelList',
    method: 'get',
    params: Object.assign({
      size: 100,
      page: 1
    }, data)
  })
}
// 删除标签
export function deleteStaffLabel(id, data = {}) {
  return request({
    url: `/cas/admin/deleteStaffLabel/${id}`,
    method: 'delete',
    data: data
  })
}
// 修改标签
export function updateStaffLabel(id, data = {}) {
  return request({
    url: `/cas/admin/updateStaffLabel/${id}`,
    method: 'put',
    data
  })
}
// 创建标签
export function insertStaffLabel(data = {}) {
  return request({
    url: '/cas/admin/insertStaffLabel',
    method: 'post',
    data
  })
}

/*
 * 机构管理
 */
// 查询机构列表信息
export function getStaffDepartList(data = {}) {
  return request({
    url: '/cas/admin/getStaffDepartList',
    method: 'get',
    params: data
  })
}
// 创建机构
export function insertStaffDepart(data = {}) {
  return request({
    url: '/cas/admin/insertStaffDepart',
    method: 'post',
    data: data
  })
}
// 修改机构账号
export function updateStaffDepart(data = {}) {
  return request({
    url: '/cas/admin/updateStaffDepart',
    method: 'put',
    data: data
  })
}
// 删除机构
export function deleteStaffDepart(id, data = {}) {
  return request({
    url: `/cas/admin/deleteStaffDepart/${id}`,
    method: 'delete',
    data: data
  })
}

/*
 * 机构人员管理
 */
// 查询机构人员列表信息
export function getStaffMainList(data = {}) {
  return request({
    url: '/cas/getStaffMainList',
    method: 'get',
    params: data
  })
}
// 创建机构人员
export function insertStaffMain(data = {}) {
  return request({
    url: '/cas/insertStaffMain',
    method: 'post',
    data: data
  })
}
// 修改机构人员账号
export function updateStaffMain(data = {}) {
  return request({
    url: '/cas/updateStaffMain',
    method: 'put',
    data: data
  })
}
// 删除机构人员账号
export function deleteStaffMain(id, data = {}) {
  return request({
    url: `/cas/deleteStaffMain/${id}`,
    method: 'delete',
    data: data
  })
}
// 给人员删除标签
export function deleteStaffLabelIntoStaffMain(id, data = {}) {
  return request({
    url: `/cas/admin/deleteStaffLabelIntoStaffMain/${id}`,
    method: 'delete',
    data: data
  })
}
// 给人员创建标签
export function insertStaffLabelIntoStaffMain(data = {}) {
  return request({
    url: '/cas/admin/insertStaffLabelIntoStaffMain',
    method: 'post',
    data: data
  })
}

// 审核人员保存信息，即修改审核状态
export function updateStaffMainForAudit(data = {}) {
  return request({
    url: '/cas/updateStaffMainForAudit',
    method: 'put',
    data: data
  })
}
// 修改机构人员保存信息，即档案基本信息
export function updateStaffMainInformationSave(data = {}) {
  return request({
    url: '/cas/updateStaffMainInformationSave',
    method: 'put',
    data: data
  })
}
// 查询机构人员信息
export function getStaffMainInformationSelect(id, data = {}) {
  return request({
    url: `/cas/getStaffMainInformationSelect/${id}`,
    method: 'get',
    params: data
  })
}

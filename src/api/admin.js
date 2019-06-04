/*
 * 系统管理相关接口
 */
import request from '@/libs/request'
export function getList(data = {}) {
  return request({
    url: '/cas/admin/getAdminMainList',
    method: 'get',
    params: data
  })
}
/*
 * 用户管理
 */
// 查询用户列表信息
export function getAdminMainList(data = {}) {
  return request({
    url: '/cas/admin/getAdminMainList',
    method: 'get',
    params: data
  })
}
// 根据角色查询用户列表信息
export function getAdminMainListByRoleId(id) {
  return request({
    url: `/cas/admin/getAdminMainList/${id}`,
    method: 'get',
    params: {
      id: id
    }
  })
}
// 创建用户账号
export function insertAdminMain(data = {}) {
  return request({
    url: '/cas/admin/insertAdminMain',
    method: 'post',
    data
  })
}
// 修改用户账号
export function updateAdminMain(id, data = {}) {
  return request({
    url: `/cas/admin/updateAdminMain`,
    method: 'put',
    data
  })
}

/*
 * 角色管理
 */
// 查询角色列表信息
export function getAdminRoleList(data = {}) {
  return request({
    url: '/cas/role/getAdminRoleList',
    method: 'get',
    data
  })
}
// 创建角色
export function insertAdminRole(data = {}) {
  return request({
    url: '/cas/role/insertAdminRole',
    method: 'post',
    data
  })
}
// 修改角色
export function updateAdminRole(data = {}) {
  return request({
    url: `/cas/role/updateAdminRole`,
    method: 'put',
    data
  })
}
// 删除角色
export function deleteAdminRole(id, data = {}) {
  return request({
    url: `/cas/role/deleteAdminRole/${id}`,
    method: 'delete',
    data
  })
}
// 角色添加用户账号
export function addMainsToRole(id, data = {}) {
  return request({
    url: `/cas/role/addMainsToRole/${id}`,
    method: 'put',
    data
  })
}
// 角色删除用户账号
export function deleteMainsToRole(id, data = {}) {
  return request({
    url: `/cas/role/deleteMainsToRole/${id}`,
    method: 'delete',
    data
  })
}
/*
 * 日志
 */
// 查询日志列表信息
export function getSysOperLogList(data = {}) {
  return request({
    url: '/cas/log/getSysOperLogList',
    method: 'get',
    showLoading: true,
    params: data
  })
}

/*
 * 查询权限列表信息
 */
// 查询权限列表信息
export function getAdminPermissionList(data = {}) {
  return request({
    url: '/cas/permission/getAdminPermissionList',
    method: 'get',
    params: data
  })
}
/*
 * 用户组管理
 */
// 查询用户组列表信息
export function getAdminGroupList(data = {}) {
  return request({
    url: '/cas/group/getAdminGroupList',
    method: 'get',
    params: data
  })
}
// 创建用户组
export function insertAdminGroup(data = {}) {
  return request({
    url: '/cas/group/insertAdminGroup',
    method: 'post',
    data: data
  })
}
// 修改用户组
export function updateAdminGroup(data = {}) {
  return request({
    url: '/cas/group/updateAdminGroup',
    method: 'put',
    data
  })
}
// 删除用户组
export function deleteAdminGroup(id, data = {}) {
  return request({
    url: `/cas/group/deleteAdminGroup/${id}`,
    method: 'delete',
    data
  })
}
// 用户组添加用户账号
export function addMainsToGroup(id, data = {}) {
  return request({
    url: `/cas/group/addMainsToGroup/${id}`,
    method: 'put',
    data
  })
}
// 用户组删除用户账号
export function deleteMainsToGroup(id, data = {}) {
  return request({
    url: `/cas/group/deleteMainsToGroup/${id}`,
    method: 'delete',
    data
  })
}

/*
 * 用户管理
 */

import request from '@/libs/request'

// 查询用户列表信息
export function getUsers(data = {}) {
  return request({
    url: '/v1/user/getUsers',
    method: 'get',
    showLoading: true,
    params: data
  })
}
// 根据角色查询用户列表信息
export function getUsersByRole(id) {
  return request({
    url: `/v1/user/getUsersByRole/${id}`,
    method: 'get',
    params: {
      id: id
    }
  })
}
// 创建用户账号
export function createUser(data = {}) {
  return request({
    url: '/v1/user/createUser',
    method: 'post',
    data
  })
}
// 修改用户账号
export function updateUser(id, data = {}) {
  return request({
    url: `/v1/user/updateUser/${id}`,
    method: 'put',
    data
  })
}

// 角色删除用户账号
export function deleteUser(id, data = {}) {
  return request({
    url: `/v1/role/deleteUser/${id}`,
    method: 'delete',
    data
  })
}

/*
 * 用户组管理
 */
// 查询用户组列表信息
export function getUserGroups(data = {}) {
  return request({
    url: '/v1/group/getGroups',
    method: 'get',
    params: data
  })
}
// 创建用户组
export function createUserGroups(data = {}) {
  return request({
    url: '/v1/group/createGroup',
    method: 'post',
    data: data
  })
}

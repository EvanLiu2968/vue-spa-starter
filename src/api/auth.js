import request from '@/libs/request'

// 登录信息
export function login(data) {
  return request({
    url: '/v1/auth/login',
    method: 'post',
    data: data
  })
}
// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/v1/auth/getUser',
    method: 'get'
  })
}
// 用户登出
export function logout() {
  return request({
    url: '/v1/auth/logout',
    method: 'get'
  })
}

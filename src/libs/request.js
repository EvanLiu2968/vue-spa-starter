import axios from 'axios'
import { Message } from 'element-ui'
import { getToken, removeToken } from '@/libs/auth'

import Loading from '@/components/common/loading'

let instance

// TODO: 应该将每个需要loading的请求加进队列，请求结束移除队列，当队列为空时才关闭loading
const loadingStack = []
const showLoading = () => {
  // loadingStack.push('Mr.Loading')
  instance = instance || Loading({
    type: 'swell',
    text: '',
    opacity: 0.5,
    fullscreen: true
  })
  instance.show()
}
const hideLoading = () => {
  // loadingStack.pop()
  if (instance && loadingStack.length === 0) {
    instance.hide()
  }
}

// 统一配置error message
const errorMessage = {
  200: '请求成功',
  201: '操作成功',
  202: '请求已经进入后台任务',
  204: '删除数据成功',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
  401: '用户没有权限',
  403: '访问被禁止',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得',
  410: '请求的资源被永久删除',
  422: '提交验证错误。',
  500: '服务器错误',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}

// 创建axios实例
const service = axios.create({
  withCredentials: true, // 授权登录需要cookie来获取session
  baseURL: '/api',
  timeout: 20000
})

// request拦截器
service.interceptors.request.use(
  config => {
    const token = getToken()
    if (!config.headers['accessToken'] && token) {
      config.headers['accessToken'] = token // 后台接口令牌
    }
    if (config.showLoading) {
      showLoading()
    }
    // ie get请求强制缓存，加上时间戳防止ie缓存
    if (config.method == 'get') {
      if (!config.params) {
        config.params = {}
      } else if (typeof config.params !== 'object') {
        console.error('request params should be a Object.')
      }
      config.params['timestamp'] = new Date().getTime()
    }
    return config
  },
  error => {
    hideLoading()
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    hideLoading()
    /**
     * code为0即成功，非0情况待定
     */
    const res = response.data
    if (res.code !== 0) {
      // 10002:无效的token
      if (res.code === 10002) {
        // store.dispatch('FedLogOut').then(() => {
        //   window.location.reload()
        // })
        removeToken()
        window.location.reload()
      } else {
        Message({
          message: res.message || '服务器错误',
          type: 'error',
          duration: 3 * 1000
        })
      }
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    hideLoading()
    // console.log(error) // for debug
    const e = JSON.parse(JSON.stringify(error))
    // e.response.status为请求status
    const message = errorMessage[e.response.status] || e.response.statusText || '服务器错误'
    Message({
      message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

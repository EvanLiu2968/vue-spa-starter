import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/pages/index/store'
import { getToken } from '@/libs/auth'

import Loading from '@/components/common/loading'

let instance

const showLoading = () => {
  instance = instance || Loading({
    type: 'swell',
    text: '',
    opacity: 0.5,
    fullscreen: true
  })
  instance.show()
}
const hideLoading = () => {
  if (instance) {
    instance.hide()
  }
}

// 创建axios实例
const service = axios.create({
  baseURL: '/api', // api 的 base_url
  timeout: 20000 // 因图片操作超时，设置为20s，后续根据业务调整
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (!config.headers['accessToken'] && store.getters.token) {
      config.headers['accessToken'] = getToken() // 后台接口令牌
    }
    if (config.showLoading) {
      showLoading()
    }
    return config
  },
  error => {
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
      Message({
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      })

      // 403:非法的token; 404:其他客户端登录了;  405:Token 过期了;
      if (res.code === 405) {
        store.dispatch('FedLogOut').then(() => {
          window.location.reload()
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('error:' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

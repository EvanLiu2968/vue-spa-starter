import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Message } from 'element-ui'
import { getToken, setToken } from '@/libs/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress configuration

const isMock = true

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  // mock login, if you has login apis, you can remove it.
  if (isMock) {
    const token = 'MOCK_TOKEN'
    setToken(token)
    store.commit('SET_TOKEN', token)
    store.commit('SET_USERINFO', {
      id: 0,
      avatar: '/images/mao.jpg',
      adminName: 'mock用户'
    })
    if (whiteList.indexOf(to.path) !== -1) {
      next()
      return
    }
  }

  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.userinfo === null) { // todo 根据用户信息中的权限列表拦截路由，菜单也将根据权限渲染
        store.dispatch('GetUserinfo').then(res => { // 拉取用户信息
          next()
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || '身份验证未通过，请重新登录！')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

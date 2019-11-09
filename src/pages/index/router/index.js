import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;

Vue.use(Router)

/* Layout */
import Layout from '../views/layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'el-icon-sys-user'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('../views/login'), hidden: true },
  { path: '/404', component: () => import('../views/404'), hidden: true },

  {
    path: '/',
    name: 'Dashboard',
    redirect: '/dashboard',
    component: Layout,
    // hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('../views/dashboard'),
        meta: { title: '首页', icon: 'el-icon-sys-shouye' }
      }
    ]
  },
  // 系统管理
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'System',
    meta: {
      permission: [41, 44, 11, 12, 13],
      title: '系统管理',
      icon: 'el-icon-sys-xitongguanli'
    },
    children: [
      {
        path: 'user',
        name: 'SystemUser',
        component: () => import('../views/system/user'),
        meta: { permission: [11], title: '用户管理' }
      },
      {
        path: 'group',
        name: 'SystemGroup',
        component: () => import('../views/system/group'),
        meta: { permission: [15], title: '用户组管理' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

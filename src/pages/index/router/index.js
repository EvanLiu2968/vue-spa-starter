import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

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
  // 消息
  {
    path: '/message',
    component: Layout,
    hidden: true,
    meta: { title: '消息' },
    children: [
      {
        path: '',
        name: 'Message',
        component: () => import('../views/dashboard/message'),
        meta: { title: '消息' }
      }
    ]
  },
  // 统计分析
  {
    path: '/chart',
    component: Layout,
    // hidden: true,
    meta: { permission: [3], title: '统计分析', icon: 'line' },
    children: [
      {
        path: '',
        name: 'Chart',
        component: () => import('../views/chart'),
        meta: { permission: [3], title: '统计分析', icon: 'el-icon-sys-tongjifenxi' }
      }
    ]
  },
  // 系统管理
  {
    path: '/system',
    component: Layout,
    redirect: '/system/org',
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
      },
      {
        path: 'role',
        name: 'SystemRole',
        component: () => import('../views/system/role'),
        meta: { permission: [12], title: '角色管理' }
      },
      {
        path: 'log',
        name: 'SystemLog',
        component: () => import('../views/system/log'),
        meta: { permission: [13], title: '日志查阅' }
      }
    ]
  },

  {
    path: '/help',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Help',
        component: () => import('../views/help'),
        meta: { title: '帮助', icon: 'el-icon-sys-bangzhu' }
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

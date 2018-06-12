import Vue from 'vue';
import Router from 'vue-router';

import Layout from '../views/layout/Layout.vue';
// 基本写法
// const Layout= resolve => require(['../views/layout/Layout.vue'], resolve);
// 其余两种打包带chunkname的写法
// const Layout= resolve => require.ensure([], () => resolve(require('../views/layout/Layout.vue')), 'Layout');
// const Layout = () => import(/* webpackChunkName: "Layout" */  '../views/layout/Layout.vue')

const Login= resolve => require(['../views/layout/Login.vue'], resolve);
const ChangePwd= resolve => require(['../views/layout/ChangePwd.vue'], resolve);
const NotFound= resolve => require(['../views/layout/404.vue'], resolve); //放在路由最后面
const Home= resolve => require(['../views/layout/Home.vue'], resolve); //放在路由最后面

const Directive= resolve => require(['../views/demo/Directive.vue'], resolve);
const Echarts= resolve => require(['../views/demo/Echarts.vue'], resolve);
const Form= resolve => require(['../views/demo/Form.vue'], resolve);
const LazyLoad= resolve => require(['../views/demo/LazyLoad.vue'], resolve);
const PageEditor= resolve => require(['../views/demo/PageEditor.vue'], resolve);
const PdfViewer= resolve => require(['../views/demo/PdfViewer.vue'], resolve);

const UserManage= resolve => require(['../views/system/UserManage.vue'], resolve);
const RoleManage= resolve => require(['../views/system/RoleManage.vue'], resolve);
const LogManage= resolve => require(['../views/system/LogManage.vue'], resolve);
const MenuManage= resolve => require(['../views/system/MenuManage.vue'], resolve);


let routes=[
  {
    path: '/',redirect: '/home',
    meta:{
      isMenu:false
    }
  },
  {
    path: '/login',
    component: Login,
    name:'登录',
    meta:{
      isMenu:false, //是否作为菜单显示
      isParent:false, //是否为下拉菜单，否则为路由菜单
      icon:'' //菜单及导航栏图标的class
    }
  },
  {
    path: '/',
    component:Layout,
    name: '',
    meta:{
      isMenu:false
    },
    children: [
      { path: '/changepwd', component: ChangePwd, name: '修改密码',
        meta:{
          isMenu:false,
          isParent:false,
          icon:'iconfont icon-password'
        }
      }
    ]
  },
  {
    path: '/',
    component:Layout,
    name: '',
    meta:{
      isMenu:true,
      isParent:false,
      icon:''
    },
    children: [
      { path: '/home', component: Home, name: '首页',
        meta:{
          isMenu:true,
          isParent:false,
          icon:'el-icon-custom-chaozhijifen'
        }
      }
    ]
  },
  {
    path: '/',
    component:Layout,
    name: '示例',
    meta:{
      isMenu:true,
      isParent:true,
      icon:'el-icon-custom-liebiao1'
    },
    children: [
      { path: '/directive', component: Directive, name: '指令',
        meta:{
          isMenu:true,
          isParent:false,
          icon:''
        }
      },
      { path: '/echarts', component: Echarts, name: '图表',
        meta:{
          isMenu:true,
          isParent:false,
          icon:''
        }
      },
      { path: '/form', component: Form, name: '表单',
        meta:{
          isMenu:true,
          isParent:false,
          icon:''
        }
      },
      { path: '/lazyload', component: LazyLoad, name: '懒加载',
        meta:{
          isMenu:true,
          isParent:false,
          icon:''
        }
      },
      { path: '/pageeditor', component: PageEditor, name: '编辑器',
        meta:{
          isMenu:true,
          isParent:false,
          icon:''
        }
      },
      { path: '/pdfviewer', component: PdfViewer, name: 'PDF阅读器',
        meta:{
          isMenu:true,
          isParent:false,
          icon:''
        }
      }
    ]
  },
  {
    path: '/',
    component:Layout,
    name: '系统管理',
    meta:{
      role:['admin','ordinary'],
      isMenu:true,
      isParent:true,
      icon:'el-icon-setting'
    },
    children: [
      { path: '/usermanage', component: UserManage, name: '用户管理',
        meta:{
          role:['admin','ordinary'],
          isMenu:true,
          isParent:false
        }
      },
      { path: '/rolemanage', component: RoleManage, name: '角色管理',
        meta:{
          role:['admin','ordinary'],
          isMenu:true,
          isParent:false
        }
      },
      { path: '/menumanage', component: MenuManage, name: '菜单管理',
        meta:{
          role:['admin','ordinary'],
          isMenu:true,
          isParent:false
        }
      },
      { path: '/logmanage', component: LogManage, name: '日志管理',
        meta:{
          role:['admin','ordinary'],
          isMenu:true,
          isParent:false
        }
      }
    ]
  },
  {
    path: '*',
    component: NotFound,
    name:'404',
    meta:{
      role:['admin','ordinary'],
      isMenu:false,
      isParent:false
    }
  }
];

Vue.use(Router);
export default new Router({
  // mode: 'history', //去掉#字符hash，后端支持可开
  scrollBehavior: () => ({ y: 0 }), //每次路由后scroll置为0
  routes: routes
})

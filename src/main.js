import Vue from 'vue';
import App from './App';
import router from './router';
//import Vuex from 'vuex'
import axios from 'axios';
import ElementUI from 'element-ui';
import '@/assets/css/reset.css';    //引入初始化css
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/common.css';    //引入常用css
import '@/assets/css/app.css';    //引入通用应用css
import '@/assets/fonts/iconfont.css';    //引入图标
import NProgress from '@/assets/lib/nprogress/nprogress'; // Progress 进度条
import '@/assets/lib/nprogress/nprogress.css';// 不从moduel引入是为方便修改样式
import store from '@/vuex/store'   //状态管理
import '@/assets/js/util.js' //全局扩展js
import fetch from '@/assets/js/fetch.js';//引入全局自定义axios
import vueWaves from '@/directive/waves'; // 水波纹指令
Vue.use(ElementUI,{size:'small'});
Vue.use(vueWaves);
//挂载在全局Vue里，即this.axios || this.fetch
Object.defineProperties(Vue.prototype, {
  axios: {
    get: function() {
      return axios;
    }
  },
  fetch: {
    get: function() {
      return fetch;
    }
  }
});

//是否被许可
function isPermission(role,roleList){
  if(!role||role.indexOf('admin')>=0)return true; //用户信息角色为admin或没标明角色统一认证为管理员，拥有所有权限
  return roleList.some(r=>role.indexOf(r)>=0) //路由中有该角色则拥有权限
}
//1.刷新重加载 2.验证登录 3.404判断 4.重写标题及缓存当前路径以便刷新调用
router.beforeEach((to, from, next) => { //切换网页标题
  NProgress.start(); // 开启Progress
  if(!store.state.login&&to.path!='/login'){ //没有登录或刷新后的状态，先初始化用户信息
    store.commit('updateUserinfo',to.path);
  }else{ //正常路由跳转
    if(to.matched.length===0){
      next({ path: '/404' });//转至404
    } else if(isPermission(store.getters.getUserInfo.role,to.meta.role)){
      document.title = to.name?(to.name+' | 开源组件库'):'开源组件库';
      next();
    }else{
      next({ path: '/404' });//转至403
    }
  }
});
router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
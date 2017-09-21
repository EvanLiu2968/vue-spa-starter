import Vue from 'vue';
import App from './App';
import router from './router';
//import Vuex from 'vuex'
import axios from 'axios';
import ElementUI from 'element-ui';
import './assets/css/reset.css';    //引入初始化css
import 'element-ui/lib/theme-default/index.css';    // 默认主题
//import './assets/css/theme/index-#41d2de.css';       //自定义主题
import './assets/css/common.css';    //引入常用css
import './assets/css/app.css';    //引入通用应用css
import './assets/fonts/iconfont.css';    //引入图标
import NProgress from './assets/js/nprogress'; // Progress 进度条
import './assets/js/nprogress.css';// 不从moduel引入是为方便修改样式
import store from './vuex/store'   //状态管理
import './assets/js/util.js' //全局扩展js
import fetch from './assets/js/fetch.js';//引入全局自定义axios
import vueWaves from './directive/waves'; // 水波纹指令
Vue.use(ElementUI);
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
	if(!store.state.login&&to.path!=='/login'){ //没有登录或刷新后的状态，先刷新用户信息，正常则导向首页或缓存页，否则导向登录页
		store.commit('updateUserinfo');
	}else{ //正常路由跳转
		setTimeout(()=>{
			if(to.path==='/404'||to.matched.length===0){
				next({ path: '/404' });//转至404
			} else if(isPermission(store.getters.getUserInfo.role,to.meta.role)){
				//console.log(to);//这里有bug，通过addRoutes首次添加的路由（例如刷新）不能反馈到router.options和to,第二次就正常了
				document.title = to.name?(to.name+' | 开源组件库'):'开源组件库';
				sessionStorage.setItem('cache_path',to.path);
				next();
			}else{
				next({ path: '/404' });//转至403无权限页
			}
		},0);
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
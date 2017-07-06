import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex'
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import './assets/css/reset.css';    //引入初始化css
import 'element-ui/lib/theme-default/index.css';    // 默认主题
//import './assets/css/theme/index-#41d2de.css';       //自定义主题
import './assets/css/common.css';    //引入常用css
import './assets/css/app.css';    //引入通用应用css
import './assets/fonts/iconfont.css';    //引入图标
import store from './vuex/store'   //状态管理
import './assets/js/util.js' //全局扩展js
Vue.use(VueAxios,axios);
Vue.use(ElementUI);
Vue.use(Vuex);

//1.刷新重加载 2.验证登录 3.404判断 4.重写标题及缓存当前路径以便刷新调用
router.beforeEach((to, from, next) => { //切换网页标题
	let userInfo=sessionStorage.getItem('userInfo');
	console.log(userInfo);
	if(userInfo&&!store.state.login){ //页面刷新时重新加载路由并跳转至之前页面
		//console.log('页面已刷新');
		store.commit('loginIn',JSON.parse(userInfo));
		let menu=store.getters.getRoute;
		router.addRoutes(menu);
		next({ path: sessionStorage.getItem('cache_path') });
		//console.log('路由已加载');
		//console.log(router.options);
	}else if(!userInfo&&to.path!=='/login'){ //暂时以sessionStorage的信息标记为登录信息，无登陆时跳转至登录页
		next({ path: '/login' });
	}else{ //正常路由跳转
		setTimeout(()=>{
			if(to.matched.length===0&&from.path!=='/'){
				next({ path: '/404' });
				console.log('404!');
			} else if(to.path!=='/404'){
				console.log(to);//这里有bug，通过addRoutes首次添加的路由（例如刷新）不能反馈到router.options和to,第二次就正常了
				console.log(from);
				document.title = to.meta.title?to.meta.title:'统一系统管理平台';
				sessionStorage.setItem('cache_path',to.path);
				next();
				console.log('页面已加载');
			}
		},0);
	}
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
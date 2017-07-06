import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
let routes=[
		{
			path: '/',
			redirect: '/login'
		},
		{
			path: '/login',
			meta:{title:'登录 | 统一系统管理平台'}, //title作为网页标题
			component: resolve => require(['../views/common/Login.vue'], resolve)
		}
	];
export default new Router({
	//mode: 'history',//去掉#，模拟完整url，需后台路由支持
	routes: routes
})

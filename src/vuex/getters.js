//类似vue的计算属性computed
export const getUserInfo = state => {
	return state.userInfo
}
export const getRoute = state => {
	let route=[];
	if(state.userInfo.role==='admin'){
		route= routes.menus['general'].concat(routes.menus['admin'],routes.others['general'],routes.others['admin']);
	}else{
		route= routes.menus['general'].concat(routes.others['general']);
	}
	route.push(notFound); //404建议最后加载
	return route;
}
export const getMenu = state => {
	let route=[];
	if(state.userInfo.role==='admin'){
		route= routes.menus['general'].concat(routes.menus['admin']);
		//console.log('admin：');
		//console.log(route);
	}else{
		route= routes.menus['general'];
		//console.log('general：');
		//console.log(route);
	}
	return route;
}
import Home from '../views/common/Home.vue';
let notFound={
	path: '/404',
	meta:{title:'404 | 统一系统管理平台'},
	component: resolve => require(['../views/common/404.vue'], resolve)
};
let routes={
	//菜单路由
	menus:{
		//普通角色
		'general':[
			{
				path: '/',
				component:Home,
				name: '',
				meta:{
					leaf:true, //只有一个节点
					icon:'' //图标样式class
				},
				children: [
					{ path: '/home', component: resolve => require(['../views/platform/Index.vue'], resolve), name: '首页',meta:{title:"首页 | 统一系统管理平台",icon:'iconfont icon-home7'}}
				]
			},
			{
				path: '/',
				component:Home,
				name: '',
				meta:{
					leaf:true,
					icon:''
				},
				children: [
					{ path: '/membersystem', component: resolve => require(['../views/platform/MemberSystem.vue'], resolve), name: '成员系统管理',meta:{title:"成员系统管理 | 统一系统管理平台",icon:'el-icon-menu'}
					}
				]
			},
		],
		//系统管理员
		'admin':[
			{
				path: '/',
				component:Home,
				name: '系统管理',
				meta:{
					limitRole:'admin',
					leaf:false,
					icon:'el-icon-setting'
				},
				children: [
					{ path: '/usermanage', component: resolve => require(['../views/system/UserManage.vue'], resolve), name: '用户管理',meta:{title:"用户管理 | 统一系统管理平台"}},
					{ path: '/rolemanage', component: resolve => require(['../views/system/RoleManage.vue'], resolve), name: '角色管理',meta:{title:"角色管理 | 统一系统管理平台"}},
					{ path: '/logsearch', component: resolve => require(['../views/system/LogSearch.vue'], resolve), name: '日志查询',meta:{title:"日志查询 | 统一系统管理平台"}}
				]
			}
		]
	},
	//非菜单路由
	others:{
		'general':[
			{
				path: '/',
				component:Home,
				name: '',
				children: [
					{ path: '/changepwd', component: resolve => require(['../views/common/ChangePwd.vue'], resolve), name: '修改密码',meta:{title:"修改密码 | 统一系统管理平台",icon:'iconfont icon-password'}}
				]
			},
			{
				path: '/',
				component:Home,
				name: '成员系统管理',
				meta:{
					leaf:true,
					icon:'el-icon-menu' 
				},
				children: [
					{ path: '/limitunity/:id', component: resolve => require(['../views/platform/LimitUnity.vue'], resolve), name: '统一权限管理',meta:{title:"统一权限管理 | 统一系统管理平台"}}
				]
			},
			{
				path: '/',
				component:Home,
				name: '成员系统管理',
				meta:{
					leaf:true,
					icon:'el-icon-menu' 
				},
				children: [
					{ path: '/logvisit/:id', component: resolve => require(['../views/platform/LogVisit.vue'], resolve), name: '访问日志',meta:{title:"访问日志 | 统一系统管理平台"}}
				]
			}
		],
		'admin':[]
	}
};
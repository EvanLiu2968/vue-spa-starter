import axios from 'axios';
import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';
import store from '../../vuex/store.js';

axios.defaults.withCredentials = true; //跨域cookie设置

// 创建axios实例，设置默认参数
const service = axios.create({
	baseURL: '/',  // api的base_url
	headers: {
		'Content-Type': 'application/json;charset=UTF-8' // 'application/json' || 'application/x-www-form-urlencoded'
	},
	withCredentials : true, //跨域携带cookie
	timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
	// Do something before request is sent
	// if (store.getters.token) {
	// 	config.headers['X-Token'] = store.getters.token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
	// }
	return config;
}, error => {
	// Do something with request error
	console.log(error); // for debug
	Promise.reject(error);
});

//页面用法：(不用处理error及非200状态)
// this.fetch({ //这里的设置会覆盖默认设置
// 	method:'get',
// 	url:'static/api/v1/member.json',
// 	params:{}, //get请求，与data二者取其一
// 	data:{}   //post请求
// }).then((res)=>{
// 	console.log(res);
// })

// respone拦截器
service.interceptors.response.use(
	response => {
		/**
		* 下面的注释为通过response自定义status来标示请求状态，当status返回如下情况为权限有问题，登出并返回到登录页
		* 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
		*/
		const res = response.data;
		if (res.status !== 200) {
			Message({
				message: res.statustext,
				type: 'error',
				showClose:true,
				duration: 3000
			});
			// 400:非法请求; 401:未授权;  403:服务器拒绝请求; 404:资源未找到
			if (res.status === 401 || res.status === 403) {
				MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '提示', {
					confirmButtonText: '重新登录',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					store.commit('loginOut');
				})
			}
			return Promise.reject(res);
		} else {
			return res;
		}
	},
	error => {
		Message({
			message: error.message,
			type: 'error',
			showClose:true,
			duration: 3000
		});
		return Promise.reject(error);
	}
);

export default service;

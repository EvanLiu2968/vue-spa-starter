import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

let defaultUserInfo={
	username:'',
	role:''
};
// 应用初始状态
const state = {
	userInfo:defaultUserInfo,
	login:false
}

// 定义所需的 mutations
//改变store的唯一方法：$store.commit('loginIn', {name: 'admin'});
const mutations = {
	loginIn(state,userInfo) {
		state.userInfo=userInfo;
		state.login=true;
		sessionStorage.setItem('userInfo',JSON.stringify(state.userInfo));
	},
	loginOut(state) {
		state.userInfo=defaultUserInfo;
		state.login=false;
		sessionStorage.removeItem('userInfo');
	},
	addAttr(state,obj) {
		state={...state,obj};
	}
}

// 创建 store 实例
export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations
})
<template>
	<div class="header">
		<div class="logo">统一系统管理平台</div>
		<div class="user-info">
			<el-dropdown trigger="click" @command="handleCommand">
				<span class="el-dropdown-link">
					<img class="user-logo" :src="userInfo.pic">
					{{userInfo.username}}
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
					<el-dropdown-item divided command="loginout">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
		<div class="pull-right">
			<el-menu theme="dark" :default-active="$route.path" class="header-menu" mode="horizontal" unique-opened router>
				<template v-for="(item,index) in menu">
					<template v-if="!item.meta.limitRole||userInfo.role===item.meta.limitRole">
						<el-submenu :index="index+''" v-if="!item.meta.leaf">
							<template slot="title"><i :class="item.meta.icon"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-else :index="item.children[0].path"><i :class="item.children[0].meta.icon"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</template>
			</el-menu>
		</div>
	</div>
</template>
<script>
import tool from '../../assets/js/tool.js';
	export default {
		data() {
			return {
				defaultUserInfo:{
					username:'gci',
					role:'admin',
					pic:'static/images/user.jpg'
				}
			}
		},
		computed:{
			userInfo(){
				let userInfo = this.$store.getters.getUserInfo;
				userInfo=tool.extend(true,this.defaultUserInfo,userInfo);
				return userInfo;
			},
			menu(){
				return this.$store.getters.getMenu;
			}
		},
		methods:{
			handleCommand(command) {
				if(command == 'loginout'){
					this.$store.commit('loginOut');
					this.$router.push({
						path:'/login',
						query:{
							action:'loginout'
						}
					});
				}else if(command == 'changePwd'){
					this.$router.push('/changepwd');
				}
			}
		},
		mounted:function(){
			//console.log(this.userInfo);
			//console.log(this.menu);
		},
		beforeMount(){}
	}
</script>
<style lang="less" scoped>
	.header {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 60px;
		font-size: 22px;
		line-height: 60px;
		color: #fff;
		background-color: #324157;//热情蓝#20A0FF//#深沉黑#324157
		.logo{
			float: left;
			margin-left:50px;
		}
	}
	// .header-menu{
	//     background-color: transparent;
	// }
	// .header-menu .el-menu-item,.header-menu .el-submenu__title{
	//     color:#fff;
	//     border:none;
	// }
	// .header-menu .el-submenu .el-menu-item{
	//     color:#48576a;
	// }
	// .header-menu .el-menu-item.is-active,
	// .header-menu .el-menu-item:hover,
	// .header-menu .el-submenu.is-active,
	// .header-menu .el-submenu:hover,{
	//     background-color: #5AB2FF;
	//     color:#fff;
	//     border-color:none;
	// }
	.user-info {
		float: right;
		padding-left:15px;
		padding-right: 50px;
		font-size: 16px;
	}
	.user-info .el-dropdown-link{
		position: relative;
		display: inline-block;
		padding-left: 50px;
		color: #bfcbd9;
		cursor: pointer;
		vertical-align: middle;
	}
	.user-info .user-logo{
		position: absolute;
		left:0;
		top:10px;
		width:40px;
		height:40px;
		border-radius: 50%;
	}
	.el-dropdown-menu__item{
		text-align: center;
	}
</style>

<template>
	<div class="header">
		<div class="logo">vue2开源组件库【603开源计划】</div>
		<div class="user-info">
			<el-dropdown trigger="click" @command="handleCommand">
				<span class="el-dropdown-link">
					<img class="user-logo" :src="userInfo.avatar">
					{{userInfo.nickname}}
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="message">我的消息</el-dropdown-item>
					<el-dropdown-item command="setting">设置</el-dropdown-item>
					<el-dropdown-item divided command="logout">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {}
		},
		computed:{
			userInfo(){
				return this.$store.getters.getUserInfo;
			}
		},
		methods:{
			handleCommand(command) {
				if(command == 'logout'){
					this.$store.commit('logout');
				}
			}
		}
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
		background-color: #20A0FF;
		.logo{
			float: left;
			margin-left:2em;
		}
	}
	.user-info {
		float: right;
		padding-right: 50px;
		font-size: 16px;
		color: #fff;
	}
	.user-info .el-dropdown-link{
		position: relative;
		display: inline-block;
		padding-left: 50px;
		color: #fff;
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

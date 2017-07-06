<template>
<div class="page-container">
	<h3 class="error-title">404</h3>
	<p class="error-desc"> 抱歉，页面没有找到！</p>
	<div class="error-btn">
		<a href="#" @click="goBack">返回上一页</a>
		<router-link to="home">返回首页</router-link>
	</div>
</div>
</template>
<script>
	export default {
		data(){
			return {}
		},
		methods:{
			goBack(){
				this.$router.back();
			}
		}
	}
</script>
<style lang="less" scoped>
	.page-container {
		padding-top:50px;
		text-align: center;
		.error-title{
			font-size:36px;
			color:#ed6b75;
		}
		.error-desc{
			padding:15px;
			margin-bottom:20px;
			font-size: 16px;
			color: #adb8c5;
		}
	}
	.error-btn>a{
		color:#adb8c5 !important;
		border:1px solid #adb8c5;
		padding:8px 10px;
		border-radius:4px;
		margin-right:15px;
		&:hover{
			color:#20a0ff !important;
			border-color:#20a0ff;
		}
	}
</style>
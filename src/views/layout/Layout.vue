<template>
	<el-container>
		<el-aside :width="isCollapse?'64px':'200px'">
			<v-sidebar></v-sidebar>
		</el-aside>
		<el-container>
			<el-header height=50px;>
				<v-head></v-head>
			</el-header>
			<el-main>
				<el-card class="content">
					<transition name="el-fade-in" mode="out-in">
						<router-view></router-view>
					</transition>
				</el-card>
			</el-main>
		</el-container>
	</el-container>
	<!-- <div class="wrapper">
		<v-head></v-head>
		<v-sidebar></v-sidebar>
		<div class="content">
			<div class="crumbs">
				<el-breadcrumb separator="/">
					<template v-for="item in $route.matched">
						<el-breadcrumb-item v-if="item.name"><i v-if="item.meta.icon" :class="item.meta.icon"></i>{{ item.name }}</el-breadcrumb-item>
					</template>
				</el-breadcrumb>
			</div>
			<transition name="move" mode="out-in">
				<router-view></router-view>
			</transition>
		</div>
	</div> -->
</template>

<script>
	import vHead from './Header.vue';
	import vSidebar from './Sidebar.vue';
	export default {
		components:{
			vHead, vSidebar
		},
		computed:{
			isCollapse(){
				return this.$store.getters.getIsCollapse;
			}
		}
	}
</script>
<style>
  .el-container{
		height:100%;
  }
  .el-aside {
		min-height:100%;
		overflow-y:auto;
		background-color:#545c64;
	}
	.el-header{
		background-color: #fff;
		/* box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); */
		border-bottom:1px solid #dfe4ed;
  }
  .el-main {
		padding:15px !important;
    background-color: #F0F3FA;
  }
  .el-main>.content{
		/* padding:0; */
		min-height:560px;
    /* background-color: #fff; */
  }
</style>
<template>
	<div>
		<div class="logo-container">
			<img class="logo" src="static/images/logo.png" />
		</div>
		<el-menu :default-active="$route.path"  unique-opened router 
			:collapse="isCollapse"
			background-color="#545c64"
			text-color="#fff"
			active-text-color="#ffd04b">
			<template v-for="(item,index) in menus">
				<!-- 后续需分角色显示菜单 -->
				<template v-if="item.meta.isMenu">
					<el-submenu :index="index+''"  v-if="item.meta.isParent">
						<template slot="title">
							<i :class="item.meta.icon"></i><span slot="title">{{item.name}}</span>
						</template>
						<el-menu-item-group v-for="child in item.children">
							<el-menu-item :index="child.path">{{child.name}}</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-menu-item v-else :index="item.children[0].path"><i :class="item.children[0].meta.icon"></i><span slot="title">{{item.children[0].name}}</span></el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script>
	export default {
		data (){
			return {}
		},
		computed:{
			menus(){
				return this.$router.options.routes;
			},
			isCollapse(){
				return this.$store.getters.getIsCollapse;
			}
		}
	}
</script>

<style scoped>
	.el-menu{
		border-right:none;
	}
	.el-menu:not(.el-menu--collapse) {
		width: 200px;
	}
	.el-menu-item i,.el-submenu__title i {
		color: #fff;
	}
	.logo-container{
		padding:5px 12px;
		height:50px;
		background-color:#474c56;
	}
	.logo{
		display:inline-block;
		width:40px;height:40px;
	}
</style>

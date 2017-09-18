<template>
	<div class="sidebar">
		<el-menu :default-active="$route.path"  unique-opened router>
			<template v-for="(item,index) in menus">
				<!-- 后续需分角色显示菜单 -->
				<template v-if="item.meta.isMenu">
					<el-submenu :index="index+''"  v-if="item.meta.isParent">
						<template slot="title"><i :class="item.meta.icon"></i>{{item.name}}</template>
						<el-menu-item v-for="child in item.children" :index="child.path" >{{child.name}}</el-menu-item>
					</el-submenu>
					<el-menu-item v-else :index="item.children[0].path"><i :class="item.children[0].meta.icon"></i>{{item.children[0].name}}</el-menu-item>
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
			}
		}
	}
</script>

<style scoped>
	.sidebar{
		display: block;
		position: absolute;
		width: 200px;
		left: 0;
		top: 60px;
		bottom:0;
	}
	.sidebar > ul {
		height:100%;
	}
</style>

<template>
	<div class="sidebar">
		<el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router>
			<template v-for="(item,index) in menu">
				<template v-if="!item.meta.limitRole||role===item.meta.limitRole">
					<el-submenu :index="index+''" v-if="!item.meta.leaf">
						<template slot="title"><i :class="item.meta.icon"></i>{{item.name}}</template>
						<el-menu-item v-for="child in item.children" :index="child.path">{{child.name}}</el-menu-item>
					</el-submenu>
					<el-menu-item v-else :index="item.children[0].path"><i :class="item.children[0].meta.icon"></i>{{item.children[0].name}}</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script>
	import Menu from '../../router/menu.js'
	export default {
		data (){
			return {
				menu:Menu
			}
		},
		computed:{
			role(){
				return localStorage.getItem('ms_username')
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

<template>
	<div class="wrapper">
		<v-head></v-head>
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
	</div>
</template>

<script>
	import vHead from './Header.vue';
	export default {
		components:{
			vHead
		}
	}
</script>

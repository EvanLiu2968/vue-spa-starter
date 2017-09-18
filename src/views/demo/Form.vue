<template>
	<div>
		<div class="plugins-tips">
			表单元素
		</div>
		<ev-input name="name" v-model="title" required :maxlength="100">标题</ev-input>
		<div>
			我已经
		<ev-count-star ref='countstart' class='example' :start-val='count.start' :end-val='1992' :duration='count.duration' :decimals='_decimals' 
		:separator='count.separator' prefix='从' :suffix='count.suffix' :autoplay='false'></ev-count-star>
		<ev-count-star ref='countend' class='example' :start-val='count.start' :end-val='count.end' :duration='count.duration' :decimals='_decimals' 
		:separator='count.separator' prefix='到' :suffix='count.suffix' :autoplay='false'></ev-count-star>
		走过了25载。
		<el-button type="primary" size="mini" @click="countPlay">播放</el-button>
		<el-button type="primary" size="mini" @click="countPause">暂停</el-button>
		</div>
		
	</div>
</template>

<script>
import EvCountStar from "components/EvCountStar";
import EvInput from "components/EvInput";
	export default {
		components:{
			EvCountStar,EvInput
		},
		data: function(){
			return {
				title:'',
				count:{
					start: 0,
					end: 2017,
					duration: 4000,
					setDecimals: 0,
					separator: ',',
					suffix: ' 年',
				}
			}
		},
		computed:{
		},
		methods:{
			countPlay(){
				this.$refs.countstart.start();
				this.$refs.countend.start();
			},
			countPause(){
				this.$refs.countstart.pauseResume();
				this.$refs.countend.pauseResume();
			}
		},
		beforeMount(){
		}
	}
</script>

<style scoped>
</style>
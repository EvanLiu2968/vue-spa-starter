<template>
	<div>
		<div class="component-tips">
			表单元素
		</div>
		<ev-input name="name" v-model="title" required :maxlength="100">标题</ev-input>
		<div class="example-box">
			从1992到
		<ev-count-star ref='countstart' class='example' :start-val='count.start' :end-val='count.end' :duration='count.duration' 
		separator='' prefix='' suffix='' :autoplay='true'></ev-count-star>走过了
		<ev-count-star ref='countend' class='example' :start-val='0' :end-val='count.age' :duration='count.duration' 
		separator='' prefix='' suffix='' :autoplay='true'></ev-count-star>载
		</div>
		<el-button type="primary" size="mini" @click="countPlay">播放</el-button>
		<el-button type="primary" size="mini" @click="countPause">暂停</el-button>
		<ev-sticky className="sub-navbar" :stickyTop="80" :zIndex="999">
			<div>滚动页面我会吸附在顶端</div>
		</ev-sticky>
		<div style="height:900px;background-color:#13ce66;"></div>
	</div>
</template>

<script>
import EvCountStar from "components/EvCountStar";
import EvInput from "components/EvInput";
import EvSticky from 'components/EvSticky';
	export default {
		components:{
			EvCountStar,EvInput,EvSticky
		},
		data: function(){
			return {
				title:'',
				count:{
					start: 1992,
					end: 2017,
					duration: 4000,
					age:0
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
			this.count.end=~~new Date().format('yyyy');
			this.count.age=this.count.end-this.count.start;
		}
	}
</script>

<style scoped>
.example-box{
	margin: 10px 0;
	font-size:30px;
	line-height:80px;
}
.example {
	font-size: 80px;
	color: #F6416C;
	display: inline-block;
	text-align: center;
	font-weight: 500;
}
</style>
<template>
	<div>
		<el-row>
			<el-col :span="24"></el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<div class="member-wrapper clearfix">
				<template v-for="item in memberList">
				<el-tooltip class="item" effect="dark" :content="item.title" placement="bottom" :open-delay="500">
					<a class="member" :href="item.url" target="_blank">
						<img :src="item.pic">
						<div class="member-title">{{item.title}}</div>
					</a>
					</el-tooltip>
				</template>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				memberList:[
					{
						title:'交通问卷调查系统',
						pic:'static/images/app/1.png',
						url:'http://10.89.134.80:8015/'
					},
					{
						title:'广州出行分析系统',
						pic:'static/images/app/2.png',
						url:'http://10.89.134.80:8015/'
					},
					{
						title:'公交客流数据多模式采集与分析处理系统',
						pic:'static/images/app/3.png',
						url:'http://10.89.134.80:8015/'
					},
					{
						title:'公路客运旅客运输分析监管和考核系统',
						pic:'static/images/app/4.png',
						url:'http://10.89.134.80:8015/'
					},
					{
						title:'公共交通线网与客流数据采集分析系统',
						pic:'static/images/app/5.png',
						url:'http://10.89.134.80:8015/'
					},
					{
						title:'广州市交通信息指挥中心（数据中心）',
						pic:'static/images/app/6.png',
						url:'http://10.89.134.80:8015/'
					}
				]
			}
		},
		beforeMount() {
		},
		afterMount() {
			console.log(this.memberList);
		}
	}
</script>

<style lang="less" scoped>
@import '../../assets/less/mixins.less';
.member-wrapper{
	display:block;
	margin: 15px 150px;
}
.member{
	float:left;
	display:block;
	width:140px;
	margin-right:8px;
	padding:8px;
	border:2px solid transparent;
}
.member:hover{
	border-color:#20A0FF;
}
.member img{
	display:block;
	margin:0 auto;
	width:120px;
	height:120px;
	margin-bottom:4px;
}
.member .member-title{
	text-align:center;
	font-size:14px;
	line-height:20px;
	.text-overflow();
}
</style>
<template>
	<div>
		<div class="table">
			<el-form :inline="true" :model="queryForm" ref="queryForm">
				<el-form-item label="登录时间段">
					<el-date-picker v-model="queryForm.loginTime" type="daterange" placeholder="选择日期范围"></el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search"><i class="el-icon-search"></i>查询</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="systemNo" label="系统编号" width="100">
				</el-table-column>
				<el-table-column prop="systemName" label="系统名称" min-width="200" >
				</el-table-column>
				<el-table-column prop="account" label="平台账号" width="200">
				</el-table-column>
				<el-table-column prop="loginTime" label="登录时间" width="240">
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pagination.currentPage"
					:page-sizes="[10, 20, 50, 100]"
					:page-size="pagination.pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="pagination.total">
				</el-pagination>
			</div>
		</div>
		<el-dialog title="详情信息" v-model="detailVisible">
			<p>{{detailContent}}</p>
			<div slot="footer" class="dialog-footer">
				<el-button @click="detailVisible = false">关闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				queryForm:{
					loginTime:''
				},
				tableData: [],
				resData:[
					{
						systemNo:'0001',
						systemName:'交通问卷调查系统',
						account:'zhangsan',
						loginTime:'2017-04-01 12:13:14',
						remark:'暂无'
					},
					{
						systemNo:'0001',
						systemName:'交通问卷调查系统',
						account:'lisi',
						loginTime:'2017-04-01 12:13:14',
						remark:'暂无'
					}
				],
				pagination:{
					currentPage:1,
					pageSize:10,
					total:0
				},
				detailVisible:false,
				detailContent:""
			}
		},
		watch: {},
		methods: {
			edit(index,row){},
			delete(index,row){},
			search(){
				let params=this.queryForm;
				let headers={
					"Accept":"application/json;charset=utf-8"
				};
				// this.axios.get('/api/japi/toh?key=e676ca1db545a88c1a22c7da35253776&v=1.0',{params:params,headers:headers}).then( (res) => {
					// this.resData = res.data.result;
					this.pagination.currentPage=1;
					this.pagination.total=this.resData.length;
					this.paginate();
				// });
			},
			paginate(){
				let pageSize=this.pagination.pageSize;
				let currentPage=this.pagination.currentPage;
				this.tableData=this.resData.slice((currentPage-1)*pageSize,currentPage*pageSize);
			},
			handleSizeChange(size){
				this.pagination.pageSize=size;
				this.paginate();
			},
			handleCurrentChange(current){
				this.pagination.currentPage=current;
				this.paginate();
			}
		},
		beforeMount(){
			this.search();
		},
		mounted:function(){
			console.log(this.$route);
		}
	}
</script>
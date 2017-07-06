<template>
	<div>
		<div class="table">
			<el-form :inline="true" :model="queryForm" ref="queryForm">
				<el-form-item label="用户名称或登录名称">
					<el-input v-model="queryForm.user" placeholder="请输入名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search"><i class="el-icon-search"></i>查询</el-button>
				</el-form-item>
				</el-form-item>
			</el-form>
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="userName" label="用户名称" width="150">
				</el-table-column>
				<el-table-column prop="loginName" label="登录名" width="150" >
				</el-table-column>
				<el-table-column prop="org" label="组织机构" width="120">
				</el-table-column>
				<el-table-column prop="state" label="状态" width="120">
				</el-table-column>
				<el-table-column label="成员系统访问权限" width="150">
					<template scope="scope">
						<el-button type="primary" size="small" @click="set(scope.$index, scope.row)">设置</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="pic" label="备注" min-width="150">
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
					searchItem:'system',
					searchText:''
				},
				tableData: [],
				resData:[
					{
						systemNo:'1',
						userName:'张三',
						loginNane:'zhangsan',
						org:'OA系统',
						state:'停用',
						remark:'暂无'
					},
					{
						systemNo:'2',
						userName:'李四',
						loginNane:'lisi',
						org:'OA系统',
						state:'正常',
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
		}
	}
</script>
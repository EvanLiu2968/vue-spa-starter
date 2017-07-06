<template>
	<div>
		<div class="table">
			<el-form :inline="true" :model="queryForm" ref="queryForm">
				<el-form-item label="系统名称">
					<el-input v-model="queryForm.searchText" placeholder="系统名称，支持模糊搜索"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search" icon="search">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="add" icon="plus">新增</el-button>
				</el-form-item>
				</el-form-item>
			</el-form>
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="systemName" label="系统名称" width="160">
				</el-table-column>
				<el-table-column prop="url" label="系统网址" min-width="160">
				</el-table-column>
				<el-table-column prop="pic" label="系统图标" width="80">
					<template scope="scope">
						<img :src="scope.row.pic" style="width:40px">
					</template>
				</el-table-column>
				<el-table-column prop="systemIntro" label="系统简介" min-width="200">
				</el-table-column>
				<el-table-column prop="state" label="状态" width="80" :formatter="stateFormatter">
				</el-table-column>
				<el-table-column label="操作" width="250">
					<template scope="scope">
					<el-button-group>
						<el-button type="primary" size="small" @click="edit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="primary" size="small" @click="delSystem(scope.$index, scope.row)">删除</el-button>
						<template v-if="scope.row.hasAccount">
							<el-button type="primary" size="small" @click="changeAccount(scope.$index, scope.row)">修改账号</el-button>
						</template>
						<template v-else>
							<el-button type="primary" size="small" @click="setAccount(scope.$index, scope.row)">设置账号</el-button>
						</template>
						<el-button type="primary" size="small" @click="logVisit(scope.$index, scope.row)">访问日志</el-button>
					</el-button-group>
					</template>
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
		<el-dialog title="新增成员系统" v-model="addFormVisible">
			<div class="form-box">
				<el-form :model="addForm" ref="addForm" :rules="addFormRules" label-width="120px">
					<el-form-item label="系统名称" prop="systemName">
						<el-input v-model="addForm.systemName"></el-input>
					</el-form-item>
					<el-form-item label="系统网址" prop="url">
						<el-input v-model="addForm.url"></el-input>
					</el-form-item>
					<el-form-item label="系统图标" prop="pic">
						<el-upload
						  class="avatar-uploader"
						  action="https://jsonplaceholder.typicode.com/posts/"
						  :show-file-list="false"
						  :on-success="addPicSuccess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="addForm.pic" :src="addForm.pic" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<!-- <el-input v-model="addForm.pic"></el-input> -->
					</el-form-item>
					<el-form-item label="系统简介" prop="systemIntro">
						<el-input type="textarea" row="2" v-model="addForm.systemIntro"></el-input>
					</el-form-item>
					<el-form-item label="状态" prop="state">
						<el-select v-model="addForm.state" placeholder="请选择">
							<el-option label="冻结" value="0"></el-option>
							<el-option label="开放" value="1"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer text-center">
				<el-button @click="addFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveAddForm('addForm')">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="编辑成员系统" v-model="editFormVisible">
			<div class="form-box">
				<el-form :model="editForm" ref="editForm" :rules="addFormRules" label-width="120px">
					<el-form-item label="系统名称" prop="systemName">
						<el-input v-model="editForm.systemName"></el-input>
					</el-form-item>
					<el-form-item label="系统网址" prop="url">
						<el-input v-model="editForm.url"></el-input>
					</el-form-item>
					<el-form-item label="系统图标" prop="pic">
						<el-upload
						  class="avatar-uploader"
						  action="https://jsonplaceholder.typicode.com/posts/"
						  :show-file-list="false"
						  :on-success="addPicSuccess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="editForm.pic" :src="editForm.pic" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<!-- <el-input v-model="editForm.pic"></el-input> -->
					</el-form-item>
					<el-form-item label="系统简介" prop="systemIntro">
						<el-input type="textarea" row="2" v-model="editForm.systemIntro"></el-input>
					</el-form-item>
					<el-form-item label="状态" prop="state">
						<el-select v-model="editForm.state" placeholder="请选择">
							<el-option label="冻结" value="0"></el-option>
							<el-option label="开放" value="1"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer text-center">
				<el-button @click="editFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveEditForm('editForm')">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="设置/修改账号" v-model="setAccountFormVisible">
			<div class="form-box">
				<el-form :model="setAccountForm" ref="setAccountForm" :rules="setAccountFormRules" label-width="120px">
					<el-form-item label="账号" prop="account">
						<el-input v-model="setAccountForm.account"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input type="password" v-model="setAccountForm.password"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer text-center">
				<el-button @click="setAccountFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveSetAccountForm('setAccountForm')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import Check from '../../assets/js/validate.js'
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
						systemNo:'0001',
						systemName:'公交客流数据多模式采集与分析处理系统',
						systemIntro:'挖掘城市人群位移规律，掌握城市市民出行需求和出行特征',
						url:'http://10.89.134.80:8015/',
						pic:'static/images/app/1.png',
						hasAccount:false,
						state:'1'
					},
					{
						systemNo:'0002',
						systemName:'广州出行分析系统',
						systemIntro:'通过自定义合并交通小区从而方便实现重点区域的监测',
						url:'http://10.89.134.80:8015/',
						pic:'static/images/app/2.png',
						hasAccount:false,
						state:'1'
					},
					{
						systemNo:'0003',
						systemName:'交通问卷调查系统',
						systemIntro:'公交客流数据多模式采集与分析处理系统',
						url:'http://10.89.134.80:8015/',
						pic:'static/images/app/3.png',
						hasAccount:true,
						state:'0'
					}
				],
				pagination:{
					currentPage:1,
					pageSize:10,
					total:0
				},
				addFormVisible: false,
				editFormVisible: false,
				changeAccountFormVisible: false,
				setAccountFormVisible: false,
				addForm:{
					systemName:'',
					systemIntro:'',
					url:'',
					pic:'',
					hasAccount:false,
					state:'1'
				},
				addFormRules: {
					systemName: [
						{required:true,message:"请输入系统名称",trigger:"blur"},
						{max:"20",message:"最多输入20个字符",trigger:"blur"}
					],
					systemIntro: [
						{max:"100",message:"最多输入100个字符",trigger:"blur"}
					],
					url: [
						{required:true,message:"请输入系统网址",trigger:"blur"},
						{max:"100",message:"最多输入100个字符",trigger:"blur"}
					],
					pic: [
						{required:true,message:"请上传系统图标",trigger:"blur"}
					],
					state: [
						{required:true,message:"请设置系统状态",trigger:"blur"}
					]
				},
				editForm:{
					systemName:'',
					systemIntro:'',
					url:'',
					pic:'',
					hasAccount:false,
					state:'1'
				},
				setAccountForm:{
					account:'',
					password:''
				},
				setAccountFormRules: {
					account: [
						{required:true,message:"请输入账号",trigger:"blur"}
					],
					password: [
						{required:true,message:"请输入密码",trigger:"blur"}
					]
				}
			}
		},
		watch: {},
		methods: {
			add(index,row){
				this.addFormVisible=true;
			},
			edit(index,row){
				this.editForm=row;
				this.editFormVisible=true;
			},
			delSystem(index,row){
				this.$confirm('确定要删除该成员系统【'+row.systemName+'】吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.resData.splice(index,1);
					this.search();
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({ //this.$message.error('已取消删除');
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			changeAccount(index,row){
				this.setAccountFormVisible=true;
			},
			setAccount(index,row){
				this.setAccountFormVisible=true;
			},
			saveAddForm(form){
				this.$refs[form].validate((valid) => {
				  if (valid) {
					this.$message.success('提交成功！');
					this.addFormVisible=false;
				  } else {
					this.$message.error('请正确填写表单！');
					return false;
				  }
				});
			},
			saveEditForm(form){
				this.$refs[form].validate((valid) => {
				  if (valid) {
					this.$message.success('提交成功！');
					this.editFormVisible=false;
				  } else {
					this.$message.error('请正确填写表单！');
					return false;
				  }
				});
			},
			saveSetAccountForm(form){
				this.$refs[form].validate((valid) => {
				  if (valid) {
					this.$message.success('提交成功！');
					this.editFormVisible=false;
				  } else {
					this.$message.error('请正确填写表单！');
					return false;
				  }
				});
			},
			logVisit(index,row){
				//this.$router.push({ path: '/logvisit', params: { id: row.systemNo }});
				this.$router.push('/logvisit/'+row.systemNo); //又是addRoutes的bug ^*^
			},
			stateFormatter(row, column){
				return row.state=='0'?'冻结':'开放'
			},
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
			},
			addPicSuccess(res, file) {
				this.addForm.pic = URL.createObjectURL(file.raw);
			},
			editPicSuccess(res, file) {
				this.editForm.pic = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = (file.type === 'image/jpeg'||file.type === 'image/png');
				const isLt2M = file.size / 1024 / 1024 < 1;

				if (!isJPG) {
				  this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
				}
				if (!isLt2M) {
				  this.$message.error('上传头像图片大小不能超过 1MB!');
				}
				return isJPG && isLt2M;
			}
		},
		beforeMount(){
			this.search();
		}
	}
</script>
<style>
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #20a0ff;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 100px;
	height: 100px;
	line-height: 100px;
	text-align: center;
}
.avatar {
	width: 100px;
	height: 100px;
	display: block;
}
</style>
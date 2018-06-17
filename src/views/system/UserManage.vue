<template>
  <div>
    <div class="table">
      <el-form :inline="true" :model="queryForm" ref="queryForm">
        <el-form-item label="账号">
          <el-input v-model="queryForm.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" icon="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add" icon="plus">新增用户</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="account" label="账号" width="100">
        </el-table-column>
        <el-table-column prop="originPwd" label="初始密码" width="100">
        </el-table-column>
        <el-table-column prop="userName" label="用户名称" width="80" >
        </el-table-column>
        <el-table-column prop="org" label="所属部门" min-width="120">
        </el-table-column>
        <el-table-column prop="email" label="邮件" min-width="150">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" width="120">
        </el-table-column>
        <el-table-column label="操作" min-width="300">
          <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" @click="edit(scope.$index, scope.row)">修改资料</el-button>
            <el-button type="primary" size="mini" @click="freezeUser(scope.$index, scope.row)">冻结用户</el-button>
            <el-button type="primary" size="mini" @click="assignRole(scope.$index, scope.row)">分配角色</el-button>
            <el-button type="primary" size="mini" @click="changePwd(scope.$index, scope.row)">修改密码</el-button>
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
    <el-dialog title="新增用户" :visible="addFormVisible">
      <div class="form-box">
        <el-form :model="addForm" ref="addForm" :rules="addFormRules" label-width="120px">
          <el-form-item label="账号" prop="account">
            <el-input v-model="addForm.account"></el-input>
          </el-form-item>
          <el-form-item label="用户名称" prop="userName">
            <el-input v-model="addForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="所属部门" prop="org">
            <el-input v-model="addForm.org"></el-input>
          </el-form-item>
          <el-form-item label="邮件" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="addForm.phone"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer text-center">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAddForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改资料" :visible="editFormVisible">
      <div class="form-box">
        <el-form :model="editForm" ref="editForm" :rules="addFormRules" label-width="120px">
          <el-form-item label="账号" prop="account">
            <el-input v-model="editForm.account"></el-input>
          </el-form-item>
          <el-form-item label="用户名称" prop="userName">
            <el-input v-model="editForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="所属部门" prop="org">
            <el-input v-model="editForm.org"></el-input>
          </el-form-item>
          <el-form-item label="邮件" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="editForm.phone"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer text-center">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEditForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改密码" :visible="changePwdFormVisible">
      <div class="form-box">
        <el-form :model="changePwdForm" ref="changePwdForm" :rules="changePwdFormRules" label-width="130px">
          <el-form-item label="原密码" prop="pwd">
            <el-input type="password" v-model="changePwdForm.pwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd1">
            <el-input type="password" v-model="changePwdForm.newPwd1"></el-input>
          </el-form-item>
          <el-form-item label="再次输入新密码" prop="newPwd2">
            <el-input type="password" v-model="changePwdForm.newPwd2"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer text-center">
        <el-button @click="changePwdFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveChangePwdForm('changePwdForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分配角色" :visible="assignRoleFormVisible">
      <div class="form-box">
        <el-form :model="assignRoleForm" ref="assignRoleForm"  label-width="120px">
          <el-form-item label="角色" prop="role">
            <el-select v-model="assignRoleForm.role" placeholder="请选择">
              <el-option label="普通用户" value="0"></el-option>
              <el-option label="系统管理员" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer text-center">
        <el-button @click="assignRoleFormVisible = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Check from '../../libs/validate.js'
  export default {
    data() {
      var validatePwd2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.form.newPwd1) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        queryForm:{
          account:''
        },
        tableData: [],
        resData:[
          {
            account:'zhangsan',
            originPwd:'888888',
            userName:'张三',
            org:'广州市客运交通管理处',
            email:'zhangsan@mail.qq.com',
            phone:'17712349876',
            role:'0'
          },
          {
            account:'admin',
            originPwd:'888888',
            userName:'admin',
            org:'广州市交通运输管理局',
            email:'gci@mail.qq.com',
            phone:'17712349876',
            role:'1'
          }
        ],
        pagination:{
          currentPage:1,
          pageSize:10,
          total:0
        },
        addFormVisible: false,
        editFormVisible: false,
        changePwdFormVisible: false,
        assignRoleFormVisible:false,
        addForm:{
          account:'',
          userName:'',
          org:'',
          email:'',
          phone:''
        },
        addFormRules: {
          account: [
            {required:true,message:"请输入账号",trigger:"blur"},
            {max:"50",message:"最多输入50个字符",trigger:"blur"}
          ],
          userName: [
            {required:true,message:"请输入用户名",trigger:"blur"},
            {max:"20",message:"最多输入20个字符",trigger:"blur"}
          ],
          org: [
            {required:true,message:"请输入所属部门",trigger:"blur"},
            {max:"50",message:"最多输入50个字符",trigger:"blur"}
          ],
          email: [
            { validator: Check.validateEmail, trigger: 'blur' }
          ],
          phone: [
            { validator: Check.validatePhone, trigger: 'blur' }
          ]
        },
        editForm:{
          account:'',
          userName:'',
          org:'',
          email:'',
          phone:''
        },
        changePwdForm:{
          pwd: '',
          newPwd1: '',
          newPwd2: ''
        },
        changePwdFormRules: {
          pwd: [
            {required:true,message:"请输入密码",trigger:"blur"}
          ],
          newPwd1: [
            {required:true,message:"请输入新密码",trigger:"blur"}
          ],
          newPwd2: [
            {required:true,message:"请再次输入新密码",trigger:"blur"},
            { validator: validatePwd2, trigger: 'blur' }
          ]
        },
        assignRoleForm:{
          role:''
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
      freezeUser(index,row){
        this.$confirm('被冻结的用户不再能登录系统，确定要冻结该用户【'+row.account+'】吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.resData[index].state='0';
          this.search();
          this.$message({
            type: 'success',
            message: '冻结成功!'
          });
        }).catch(() => {
          this.$message({ //this.$message.error('已取消删除');
            type: 'info',
            message: '已取消冻结'
          });
        });
      },
      assignRole(index,row){
        this.assignRoleFormVisible=true;
        this.assignRoleForm.role=row.role;
      },
      changePwd(index,row){
        this.changePwdFormVisible=true;
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
      saveChangePwdForm(form){
        this.$refs[form].validate((valid) => {
          if (valid) {
          this.$message.success('提交成功！');
          this.changePwdFormVisible=false;
          } else {
          this.$message.error('请正确填写表单！');
          return false;
          }
        });
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
      }
    },
    beforeMount(){
      this.search();
    }
  }
</script>
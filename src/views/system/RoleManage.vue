<template>
    <div>
        <div class="table">
            <el-form :inline="true" :model="queryForm" ref="queryForm">
                <el-form-item label="角色">
                    <el-input v-model="queryForm.role" placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search" icon="search">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="add" icon="plus">新增角色</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="role" label="角色名称" width="120">
                </el-table-column>
                <el-table-column prop="roleType" label="角色类型" width="80" :formatter="roleTypeFormatter">
                </el-table-column>
                <el-table-column prop="roleDesc" label="角色描述" min-width="100" >
                </el-table-column>
                <el-table-column prop="creatPerson" label="创建人" width="100">
                </el-table-column>
                <el-table-column prop="creatTime" label="创建时间" width="160">
                </el-table-column>
                <el-table-column prop="updatePerson" label="最近修改人" width="100">
                </el-table-column>
                <el-table-column prop="updateTime" label="最近修改时间" width="160">
                </el-table-column>
                <el-table-column label="操作" width="240">
                    <template scope="scope">
                    <el-button-group>
                        <el-button type="primary" size="small" @click="edit(scope.$index, scope.row)">修改角色</el-button>
                        <el-button type="primary" size="small" @click="freezeRole(scope.$index, scope.row)">冻结角色</el-button>
                        <el-button type="primary" size="small" @click="assignRole(scope.$index, scope.row)">分配用户</el-button>
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
        <el-dialog title="新增角色" v-model="addFormVisible">
            <div class="form-box">
                <el-form :model="addForm" ref="addForm" :rules="addFormRules" label-width="120px">
                    <el-form-item label="角色名称" prop="role">
                        <el-input v-model="addForm.role"></el-input>
                    </el-form-item>
                    <el-form-item label="角色类型" prop="roleType">
                        <el-select v-model="addForm.roleType" placeholder="请选择">
                            <el-option label="系统" value="0"></el-option>
                            <el-option label="自定义" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="roleDesc">
                        <el-input type="testarea" v-model="addForm.roleDesc"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAddForm('addForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改角色" v-model="editFormVisible">
            <div class="form-box">
                <el-form :model="editForm" ref="editForm" :rules="addFormRules" label-width="120px">
                    <el-form-item label="角色名称" prop="role">
                        <el-input v-model="editForm.role"></el-input>
                    </el-form-item>
                    <el-form-item label="角色类型" prop="roleType">
                        <el-select v-model="editForm.roleType" placeholder="请选择">
                            <el-option label="系统" value="0"></el-option>
                            <el-option label="自定义" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="roleDesc">
                        <el-input type="testarea" v-model="editForm.roleDesc"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEditForm('editForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="分配用户" v-model="assignRoleFormVisible">
            <div class="form-box">
                <el-form :model="assignRoleForm" ref="assignRoleForm"  label-width="120px">
                    <el-form-item label="角色" prop="role">
                        <el-input v-model="assignRoleForm.role" placeholder=""></el-input>
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
import Check from '../../assets/js/validate.js'
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
                    role:''
                },
                tableData: [],
                resData:[
                    {
                        role:'系统管理员',
                        roleType:'0',
                        roleDesc:'系统管理员拥有最高级权限',
                        creatPerson:'admin',
                        creatTime:'2017-04-01 00:00:00',
                        updatePerson:'admin',
                        updateTime:'2017-04-01 00:00:00'
                    },
                    {
                        role:'普通用户',
                        roleType:'0',
                        roleDesc:'普通用户没有系统管理的权限',
                        creatPerson:'admin',
                        creatTime:'2017-04-01 00:00:00',
                        updatePerson:'admin',
                        updateTime:'2017-04-01 00:00:00'
                    },
                    {
                        role:'部门管理人',
                        roleType:'1',
                        roleDesc:'对相应部门用户进行管理',
                        creatPerson:'admin',
                        creatTime:'2017-04-01 10:11:12',
                        updatePerson:'admin',
                        updateTime:'2017-05-01 12:13:14'
                    }
                ],
                pagination:{
                    currentPage:1,
                    pageSize:10,
                    total:0
                },
                addFormVisible: false,
                editFormVisible: false,
                assignRoleFormVisible:false,
                addForm:{
                    role:'',
                    roleType:'',
                    roleDesc:''
                },
                addFormRules: {
                    role: [
                        {required:true,message:"请输入角色名称",trigger:"blur"},
                        {max:"50",message:"最多输入50个字符",trigger:"blur"}
                    ],
                    roleType: [
                        {required:true,message:"请选择角色类型",trigger:"blur"},
                        {max:"20",message:"最多输入20个字符",trigger:"blur"}
                    ],
                    roleDesc: [
                        {max:"200",message:"最多输入200个字符",trigger:"blur"}
                    ]
                },
                editForm:{
                    role:'',
                    roleType:'',
                    roleDesc:''
                },
                assignRoleForm:{
                    role:''
                }
            }
        },
        watch: {},
        methods: {
            roleTypeFormatter(row, column){
                return row.roleType=='0'?'系统':'自定义'
            },
            add(index,row){
                this.addFormVisible=true;
            },
            edit(index,row){
                this.editForm=row;
                this.editFormVisible=true;
            },
            freezeRole(index,row){
                this.$confirm('被冻结的角色将不能被使用，确定要冻结该角色【'+row.role+'】吗?', '提示', {
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
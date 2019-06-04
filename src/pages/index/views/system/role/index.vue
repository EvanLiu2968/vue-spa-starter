<template>
  <div class="app-container">
    <app-table :table-data="tableData" :row-select="false" @pagerChange="fetchData">
      <el-table-column prop="roleName" label="角色名称" width="120"></el-table-column>
      <el-table-column prop="adminCount" label="帐号数" width="120">
        <template slot-scope="scope">
          <router-link :to="{ path: '/system/user', query: { roleId: scope.row.recId, adminStatus: 0 }}">{{ scope.row.adminCount }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="recId" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="() => addCount(scope)">添加帐号</el-button>
          <el-button type="text" @click="() => editRole(scope)">修改角色</el-button>
          <el-button type="text" @click="() => deleteRole(scope)">删除</el-button>
        </template>
      </el-table-column>
      <div slot="header-right">
        <el-button plain @click="addRole">新增角色</el-button>
      </div>
    </app-table>
    <el-dialog
      :visible.sync="addRoleFormVisible"
      title="新增角色">
      <el-row>
        <el-col :span="16">
          <el-form ref="addRoleForm" :model="addRoleForm" :rules="addRoleFormRules" label-width="120px">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="addRoleForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色权限" prop="role">
              <permission-select v-model="addRoleForm.permissionIds" style="width:100%"></permission-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddRoleForm('addRoleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="editRoleFormVisible"
      title="修改角色">
      <el-row>
        <el-col :span="16">
          <el-form ref="editRoleForm" :model="editRoleForm" :rules="editRoleFormRules" label-width="120px">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="editRoleForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色权限" prop="role">
              <permission-select placeholder="请选择" v-model="editRoleForm.permissionIds" style="width:100%"></permission-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditRoleForm('addRoleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="addAccountFormVisible"
      title="添加帐号">
      <el-form ref="addRoleForm" :inline="true">
        <el-form-item label="关键字" prop="roleName">
          <el-input v-model="userQuery.keyWord" placeholder="用户名或帐号"></el-input>
        </el-form-item>
        <el-button type="primary" @click="searchUser">搜索</el-button>
      </el-form>
      <app-table ref="userTable" :table-data="userTableData" :selectable="selectable" @pagerChange="searchUser">
        <el-table-column prop="adminAccount" label="帐号" width="160"></el-table-column>
        <el-table-column prop="adminName" label="姓名"></el-table-column>
        <el-table-column prop="recId" label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.roles && scope.row.roles.find(item => item.recId === addAccountRole.recId)" type="text" @click="() => deleteAccountToRole(scope)">删除</el-button>
            <el-button v-else type="text" @click="() => addAccountToRole(scope)">添加</el-button>
          </template>
        </el-table-column>
        <div slot="header-right">
          <el-button type="primary" @click="batchAddAccount">添加帐号</el-button>
        </div>
      </app-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addAccountFormVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAdminMainList,
  insertAdminRole,
  updateAdminRole,
  addMainsToRole,
  deleteMainsToRole,
  deleteAdminRole,
  getAdminRoleList
} from '@/api/admin'
import PermissionSelect from '@/components/app/permission-select'
export default {
  components: {
    PermissionSelect
  },
  data() {
    return {
      query: {
        page: 1,
        size: 10
      },
      tableData: {},
      userQuery: {
        page: 1,
        size: 10,
        keyWord: '',
        adminStatus: 0
      },
      userTableData: {},
      addRoleFormVisible: false,
      addRoleForm: {},
      addRoleFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称' },
          { max: '20', message: '最多输入20个字符' }
        ]
      },
      editRoleFormVisible: false,
      editRoleForm: {},
      editRoleFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称' },
          { max: '20', message: '最多输入20个字符' }
        ]
      },
      addAccountFormVisible: false,
      addAccountRole: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(pager = {}) {
      getAdminRoleList(pager).then(res => {
        res.response.records = res.response.records.map((item) => {
          item.permissionIds = item.permissions ? item.permissions.map(r => r.recId) : []
          return item
        })
        this.tableData = res.response
      })
    },
    searchUser(pager = {}) {
      getAdminMainList(Object.assign({}, this.userQuery, pager)).then(res => {
        this.userTableData = res.response
      })
    },
    addRole() {
      this.addRoleForm = {
        permissionIds: [],
        roleName: ''
      }
      this.$refs.addRoleForm && this.$refs.addRoleForm.clearValidate()
      this.addRoleFormVisible = true
    },
    submitAddRoleForm() {
      this.$refs.addRoleForm.validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.addRoleForm)
          insertAdminRole(data).then(res => {
            this.addRoleFormVisible = false
            this.$message.success('提交成功！')
            this.fetchData()
          })
        } else {
          return false
        }
      })
    },
    editRole(scope) {
      this.editRoleForm = Object.assign({}, scope.row)
      this.$refs.editRoleForm && this.$refs.editRoleForm.clearValidate()
      this.editRoleFormVisible = true
    },
    submitEditRoleForm() {
      this.$refs.editRoleForm.validate((valid) => {
        if (valid) {
          const { recId, permissionIds, roleName } = this.editRoleForm
          updateAdminRole({
            recId,
            permissionIds,
            roleName
          }).then(res => {
            this.editRoleFormVisible = false
            this.$message.success('提交成功！')
            this.fetchData()
          })
        } else {
          return false
        }
      })
    },
    deleteRole(scope) {
      this.$confirm(`是否确定删除该角色？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAdminRole(scope.row.recId).then(res => {
          this.editRoleFormVisible = false
          this.$message.success('操作成功！')
          this.fetchData()
        })
      })
    },
    addCount(scope) {
      this.addAccountRole = scope.row
      this.addAccountFormVisible = true
      this.searchUser()
    },
    selectable(row, index) {
      return !(row.roles && row.roles.find(item => item.recId === this.addAccountRole.recId))
    },
    addAccountToRole(scope) {
      addMainsToRole(this.addAccountRole.recId, {
        adminIds: [scope.row.recId]
      }).then(res => {
        this.$message.success('操作成功！')
        this.searchUser()
        this.fetchData()
      })
    },
    deleteAccountToRole(scope) {
      deleteMainsToRole(this.addAccountRole.recId, {
        adminIds: [scope.row.recId]
      }).then(res => {
        this.$message.success('操作成功！')
        this.searchUser()
        this.fetchData()
      })
    },
    batchAddAccount() {
      const adminIds = this.$refs.userTable.multipleSelection.map(item => item.recId)
      addMainsToRole(this.addAccountRole.recId, {
        adminIds
      }).then(res => {
        this.addAccountFormVisible = false
        this.$message.success('提交成功！')
        this.fetchData()
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

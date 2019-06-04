<template>
  <div class="app-container">
    <app-table :table-data="tableData" :row-select="false" @pagerChange="fetchData">
      <el-table-column prop="groupName" label="用户组名称" width="120"></el-table-column>
      <el-table-column prop="adminCount" label="帐号数" width="120">
        <template slot-scope="scope">
          <router-link :to="{ path: '/system/user', query: { groupId: scope.row.recId, adminStatus: 0 }}">{{ scope.row.adminCount }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="recId" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="() => addCount(scope)">添加帐号</el-button>
          <el-button type="text" @click="() => editGroup(scope)">修改用户组</el-button>
          <el-button type="text" @click="() => deleteGroup(scope)">删除</el-button>
        </template>
      </el-table-column>
      <div slot="header-right">
        <el-button plain @click="addGroup">新增用户组</el-button>
      </div>
    </app-table>
    <el-dialog
      :visible.sync="addGroupFormVisible"
      title="新增用户组">
      <el-row>
        <el-col :span="16">
          <el-form ref="addGroupForm" :model="addGroupForm" :rules="addGroupFormRules" label-width="120px">
            <el-form-item label="用户组名称" prop="groupName">
              <el-input v-model="addGroupForm.groupName"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addGroupFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddGroupForm('addGroupForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="editGroupFormVisible"
      title="修改用户组">
      <el-row>
        <el-col :span="16">
          <el-form ref="editGroupForm" :model="editGroupForm" :rules="editGroupFormRules" label-width="120px">
            <el-form-item label="用户组名称" prop="groupName">
              <el-input v-model="editGroupForm.groupName"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editGroupFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditGroupForm('addGroupForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="addAccountFormVisible"
      title="添加帐号">
      <el-form ref="addGroupForm" :inline="true">
        <el-form-item label="关键字" prop="groupName">
          <el-input v-model="userQuery.keyWord" placeholder="用户名或帐号"></el-input>
        </el-form-item>
        <el-button type="primary" @click="searchUser">搜索</el-button>
      </el-form>
      <app-table ref="userTable" :table-data="userTableData" :selectable="selectable" @pagerChange="searchUser">
        <el-table-column prop="adminAccount" label="帐号" width="160"></el-table-column>
        <el-table-column prop="adminName" label="姓名"></el-table-column>
        <el-table-column prop="recId" label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.groups && scope.row.groups.find(item => item.recId === addAccountGroup.recId)" type="text" @click="() => deleteAccountToGroup(scope)">删除</el-button>
            <el-button v-else type="text" @click="() => addAccountToGroup(scope)">添加</el-button>
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
  insertAdminGroup,
  updateAdminGroup,
  addMainsToGroup,
  deleteMainsToGroup,
  deleteAdminGroup,
  getAdminGroupList
} from '@/api/admin'

export default {
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
      addGroupFormVisible: false,
      addGroupForm: {},
      addGroupFormRules: {
        groupName: [
          { required: true, message: '请输入用户组名称' },
          { max: '20', message: '最多输入20个字符' }
        ]
      },
      editGroupFormVisible: false,
      editGroupForm: {},
      editGroupFormRules: {
        groupName: [
          { required: true, message: '请输入用户组名称' },
          { max: '20', message: '最多输入20个字符' }
        ]
      },
      addAccountFormVisible: false,
      addAccountGroup: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(pager = {}) {
      getAdminGroupList(pager).then(res => {
        res.response.records = res.response.records.map((item) => {
          item.adminIds = item.admins ? item.admins.map(r => r.recId) : []
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
    addGroup() {
      this.addGroupForm = {
        adminIds: [],
        groupName: ''
      }
      this.$refs.addGroupForm && this.$refs.addGroupForm.clearValidate()
      this.addGroupFormVisible = true
    },
    submitAddGroupForm() {
      this.$refs.addGroupForm.validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.addGroupForm)
          insertAdminGroup(data).then(res => {
            this.addGroupFormVisible = false
            this.$message.success('提交成功！')
            this.fetchData()
          })
        } else {
          return false
        }
      })
    },
    editGroup(scope) {
      this.editGroupForm = Object.assign({}, scope.row)
      this.$refs.editGroupForm && this.$refs.editGroupForm.clearValidate()
      this.editGroupFormVisible = true
    },
    submitEditGroupForm() {
      this.$refs.editGroupForm.validate((valid) => {
        if (valid) {
          const { recId, adminIds, groupName } = this.editGroupForm
          updateAdminGroup({
            recId,
            adminIds,
            groupName
          }).then(res => {
            this.editGroupFormVisible = false
            this.$message.success('提交成功！')
            this.fetchData()
          })
        } else {
          return false
        }
      })
    },
    deleteGroup(scope) {
      this.$confirm(`是否确定删除该用户组？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAdminGroup(scope.row.recId).then(res => {
          this.editGroupFormVisible = false
          this.$message.success('操作成功！')
          this.fetchData()
        })
      })
    },
    addCount(scope) {
      this.addAccountGroup = scope.row
      this.addAccountFormVisible = true
      this.searchUser()
    },
    selectable(row, index) {
      return !(row.groups && row.groups.find(item => item.recId === this.addAccountGroup.recId))
    },
    addAccountToGroup(scope) {
      addMainsToGroup(this.addAccountGroup.recId, {
        adminIds: [scope.row.recId]
      }).then(res => {
        this.$message.success('操作成功！')
        this.searchUser()
        this.fetchData()
      })
    },
    deleteAccountToGroup(scope) {
      deleteMainsToGroup(this.addAccountGroup.recId, {
        adminIds: [scope.row.recId]
      }).then(res => {
        this.$message.success('操作成功！')
        this.searchUser()
        this.fetchData()
      })
    },
    batchAddAccount() {
      const adminIds = this.$refs.userTable.multipleSelection.map(item => item.recId)
      addMainsToGroup(this.addAccountGroup.recId, {
        adminIds
      }).then(res => {
        this.addAccountFormVisible = false
        this.$message.success('操作成功！')
        this.fetchData()
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

<template>
  <div class="app-container">
    <el-form :model="query" label-width="72px" label-position="left" @submit.native.prevent>
      <el-row style="margin-bottom: 10px;">
        <el-col :span="14">
          <el-input v-model="query.keyWord" class="input-search" placeholder="输入用户名或帐号，按 Enter 搜索" @keyup.enter.native="fetchData">
            <el-button slot="append" icon="el-icon-search" @click="fetchData"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-form-item label="角色">
        <el-radio-group v-model="query.roleId" class="app-radio-tag" @change="fetchData">
          <el-radio label="">全部</el-radio>
          <template v-for="(item, i) in roleList">
            <el-radio :label="item.recId" :key="i">{{ item.roleName }}</el-radio>
          </template>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="启用状态">
        <el-radio-group v-model="query.adminStatus" class="app-radio-tag" @change="fetchData">
          <el-radio label="">全部</el-radio>
          <el-radio :label="0">启用</el-radio>
          <el-radio :label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="锁定状态">
        <el-radio-group v-model="query.lockStatus" class="app-radio-tag" @change="fetchData">
          <el-radio label="">全部</el-radio>
          <el-radio :label="0">未锁定</el-radio>
          <el-radio :label="1">已锁定</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <app-table :table-data="tableData" :row-select="false" @pagerChange="pagerChange">
      <el-table-column prop="adminAccount" label="帐号" width="120"></el-table-column>
      <el-table-column prop="adminName" label="姓名" width="80"></el-table-column>
      <el-table-column prop="roleNames" label="角色名称"></el-table-column>
      <el-table-column prop="createdAdminAccount" label="创建人" width="80"></el-table-column>
      <el-table-column prop="createdTime" label="创建时间" width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.createdTime | timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="adminStatus" label="启用状态" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.adminStatus === 0 ? '已启用' : '已禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="lockStatus" label="锁定状态" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.lockStatus === 1 ? '已锁定' : '未锁定' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="recId" label="操作">
        <template slot-scope="scope">
          <div class="table-btn-group">
            <el-button type="text" @click="() => editAccount(scope)">编辑</el-button>
            <el-button type="text" @click="() => resetPassword(scope)">重置密码</el-button>
            <el-button v-if="scope.row.adminStatus === 1" type="text" @click="() => enableAccount(scope)">启用</el-button>
            <el-button v-if="scope.row.adminStatus === 0" type="text" @click="() => disableAccount(scope)">禁用</el-button>
            <el-button v-if="scope.row.lockStatus === 1" type="text" @click="() => unlockAccount(scope)">解锁</el-button>
          </div>
        </template>
      </el-table-column>
      <div slot="header-right">
        <el-button plain @click="createAccount">创建帐号</el-button>
      </div>
    </app-table>
    <el-dialog
      :visible.sync="createFormVisible"
      title="创建帐号">
      <el-row>
        <el-col :span="24">
          <el-form ref="createForm" :model="createForm" :rules="createFormRules" label-width="120px">
            <el-form-item label="帐号" prop="adminAccount">
              <el-input v-model="createForm.adminAccount" class="inline-input"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="adminName">
              <el-input v-model="createForm.adminName" class="inline-input"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" prop="adminIdcard">
              <el-input v-model="createForm.adminIdcard" class="inline-input"></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="adminPwd">
              <el-input v-model="createForm.adminPwd" class="inline-input"></el-input>
            </el-form-item>
            <!-- <el-form-item label="角色名称" prop="roleNames">
              <el-select v-model="createForm.roleIds" multiple placeholder="请选择" class="inline-input">
                <template v-for="(item, i) in roleList">
                  <el-option :label="item.roleName" :value="item.recId" :key="i"></el-option>
                </template>
              </el-select>
            </el-form-item> -->
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitCreateForm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="editFormVisible"
      title="编辑帐号">
      <el-row>
        <el-col :span="24">
          <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="120px">
            <el-form-item label="帐号" prop="adminAccount">
              <el-input v-model="editForm.adminAccount" class="inline-input"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="adminName">
              <el-input v-model="editForm.adminName" class="inline-input"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" prop="adminIdcard">
              <el-input v-model="editForm.adminIdcard" class="inline-input"></el-input>
            </el-form-item>
            <!-- <el-form-item label="角色名称" prop="roleIds">
              <el-select v-model="editForm.roleIds" multiple placeholder="请选择" class="inline-input">
                <template v-for="(item, i) in roleList">
                  <el-option :label="item.roleName" :value="item.recId" :key="i"></el-option>
                </template>
              </el-select>
            </el-form-item> -->
            <el-form-item label="状态" prop="adminStatus">
              <el-select v-model="editForm.adminStatus" placeholder="请选择" class="inline-input">
                <el-option :value="0" label="启用"></el-option>
                <el-option :value="1" label="禁用"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditForm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="resetPwdFormVisible"
      title="重置密码">
      <el-row>
        <el-col :span="24">
          <el-form ref="resetPwdForm" :model="resetPwdForm" :rules="resetPwdFormRules" label-width="120px">
            <el-form-item label="新密码" prop="adminPwd">
              <el-input v-model="resetPwdForm.adminPwd" class="inline-input"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetPwdFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitResetPwdForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  insertAdminMain,
  updateAdminMain,
  getAdminRoleList,
  getAdminMainList
} from '@/api/admin'

import * as Validator from '@/libs/validate'

export default {
  filters: {
    timeFilter(value) {
      return new Date(value).format('yyyy-MM-dd HH:mm:ss')
    }
  },
  data() {
    return {
      query: {
        page: 1,
        size: 10,
        keyWord: '',
        roleId: this.$route.query.roleId !== undefined ? parseInt(this.$route.query.roleId) : '',
        lockStatus: '',
        adminStatus: this.$route.query.adminStatus !== undefined ? parseInt(this.$route.query.adminStatus) : ''
      },
      tableData: {},
      roleList: [],
      importFiles: [],
      createFormVisible: false,
      createForm: {},
      createFormRules: {
        adminAccount: [
          { required: true, message: '请输入帐号' },
          { max: '20', message: '最多输入20个字符' }
        ],
        adminName: [
          { required: true, message: '请输入用户名' },
          { max: '20', message: '最多输入20个字符' }
        ],
        adminIdcard: [
          { required: true, message: '请输入身份证' },
          { validator: Validator.validateIdCardNo }
        ],
        adminPwd: [
          { required: true, message: '请输入密码' },
          { validator: Validator.validateStrongPassword }
        ]
      },
      editFormVisible: false,
      editForm: {},
      editFormRules: {
        adminAccount: [
          { required: true, message: '请输入帐号' },
          { max: '20', message: '最多输入20个字符' }
        ],
        adminIdcard: [
          { required: true, message: '请输入身份证' },
          { validator: Validator.validateIdCardNo }
        ],
        adminName: [
          { required: true, message: '请输入用户名' },
          { max: '20', message: '最多输入20个字符' }
        ]
      },
      resetPwdFormVisible: false,
      resetPwdForm: {},
      resetPwdFormRules: {
        adminPwd: [
          { validator: Validator.validateStrongPassword }
        ]
      }
    }
  },
  beforeCreate() {
    getAdminRoleList().then(res => {
      this.roleList = res.response.records
    })
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(resetPage = true) {
      if (resetPage) {
        this.query.page = 1
      }
      getAdminMainList(Object.assign({}, this.query)).then(res => {
        res.response.records = res.response.records.map((item) => {
          item.roleNames = item.roles.map(r => r.roleName).join('，')
          item.roleIds = item.roles.map(r => r.recId)
          return item
        })
        this.tableData = res.response
      })
    },
    pagerChange(pager) {
      this.query.page = pager.page
      this.query.size = pager.size
      this.fetchData(false)
    },
    createAccount() {
      this.createForm = {
        adminAccount: '',
        adminName: '',
        adminPwd: '',
        adminIdcard: '',
        roleIds: []
      }
      this.$refs.createForm && this.$refs.createForm.clearValidate()
      this.createFormVisible = true
    },
    submitCreateForm() {
      this.$refs.createForm.validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.createForm)
          data.adminStatus = 0
          insertAdminMain(data).then(res => {
            this.createFormVisible = false
            this.$message.success('提交成功！')
            this.fetchData()
          })
        } else {
          return false
        }
      })
    },
    editAccount(scope) {
      const data = Object.assign({}, scope.row)
      this.editForm = data
      this.$refs.editForm && this.$refs.editForm.clearValidate()
      this.editFormVisible = true
    },
    submitEditForm() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.editForm)
          data.roleIds = undefined // 不传此项
          updateAdminMain(this.editForm.recId, data).then(res => {
            this.editFormVisible = false
            this.$message.success('提交成功！')
            this.fetchData()
          })
        } else {
          return false
        }
      })
    },
    uploadSuccess(res, file) {
      if (res.code === 0) {
        this.$message.success('导入成功！')
      } else {
        this.$message.error(res.message)
      }
      // 报错也有可能数据已经导入
      this.fetchData()
    },
    resetPassword(scope) {
      this.editForm = scope.row
      this.resetPwdForm = {
        adminPwd: ''
      }
      this.$refs.resetPwdForm && this.$refs.resetPwdForm.clearValidate()
      this.resetPwdFormVisible = true
    },
    submitResetPwdForm() {
      this.$refs.resetPwdForm.validate((valid) => {
        if (valid) {
          updateAdminMain(this.editForm.recId, {
            recId: this.editForm.recId,
            adminPwd: this.resetPwdForm.adminPwd
          }).then(res => {
            this.resetPwdFormVisible = false
            this.$message.success('密码重置成功！')
            this.fetchData()
          })
        } else {
          return false
        }
      })
    },
    enableAccount(scope) {
      const data = Object.assign({}, scope.row)
      updateAdminMain(data.recId, {
        recId: data.recId,
        adminStatus: 0
      }).then(res => {
        this.$message.success('操作成功！')
        this.fetchData()
      })
    },
    disableAccount(scope) {
      const data = Object.assign({}, scope.row)
      updateAdminMain(data.recId, {
        recId: data.recId,
        adminStatus: 1
      }).then(res => {
        this.$message.success('操作成功！')
        this.fetchData()
      })
    },
    unlockAccount(scope) {
      const data = Object.assign({}, scope.row)
      updateAdminMain(data.recId, {
        recId: data.recId,
        lockStatus: 0
      }).then(res => {
        this.$message.success('操作成功！')
        this.fetchData()
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

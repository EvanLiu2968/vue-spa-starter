<template>
  <div class="app-container">
    <app-table :table-data="tableData" :row-select="false" @pagerChange="pagerChange">
      <div slot="header-left">
        <el-form :model="query" inline class="form-query" @submit.native.prevent>
          <el-form-item label="帐号">
            <el-input v-model="query.keyWord" placeholder="手机号或邮箱" @keyup.enter.native="fetchData"></el-input>
          </el-form-item>
          <el-form-item label="用户组">
            <el-select v-model="query.roleId" @change="fetchData">
              <el-option value="" label="全部"></el-option>
              <el-option v-for="(item, i) in groups" :key="i" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用状态">
            <el-select v-model="query.status" @change="fetchData">
              <el-option value="" label="全部"></el-option>
              <el-option :value="0" label="启用"></el-option>
              <el-option :value="1" label="禁用"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="header-right">
        <el-button plain @click="createAccount">创建帐号</el-button>
      </div>
      <el-table-column prop="adminAccount" label="帐号" width="120"></el-table-column>
      <el-table-column prop="adminName" label="姓名" width="80"></el-table-column>
      <el-table-column prop="names" label="角色名称"></el-table-column>
      <el-table-column prop="createdAdminAccount" label="创建人" width="80"></el-table-column>
      <el-table-column prop="createdTime" label="创建时间" width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.createdTime | timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="启用状态" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.status === 0 ? '已启用' : '已禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="操作">
        <template slot-scope="scope">
          <div class="table-btn-group">
            <el-button type="text" @click="() => editAccount(scope)">编辑</el-button>
            <el-button v-if="scope.row.status === 1" type="text" @click="() => enableAccount(scope)">启用</el-button>
            <el-button v-if="scope.row.status === 0" type="text" @click="() => disableAccount(scope)">禁用</el-button>
          </div>
        </template>
      </el-table-column>
    </app-table>
  </div>
</template>

<script>
import {
  createUser,
  updateUser,
  getUserGroups,
  getUsers
} from '@/api/user'

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
        status: this.$route.query.status !== undefined ? parseInt(this.$route.query.status) : ''
      },
      tableData: {},
      groups: [],
    }
  },
  beforeCreate() {
    getUserGroups().then(res => {
      this.groups = res.response.records
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
      getUsers(Object.assign({}, this.query)).then(res => {
        res.response.records = res.response.records.map((item) => {
          item.names = item.roles.map(r => r.name).join('，')
          item.roleIds = item.roles.map(r => r.id)
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
      this.$message.error('您没有该操作权限')
    },
    editAccount(scope) {
      this.$message.error('您没有该操作权限')
    },
    submitEditForm() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.editForm)
          data.roleIds = undefined // 不传此项
          updateUser(this.editForm.id, data).then(res => {
            this.editFormVisible = false
            this.$message.success('提交成功！')
            this.fetchData()
          })
        } else {
          return false
        }
      })
    },
    enableAccount(scope) {
      const data = Object.assign({}, scope.row)
      updateUser(data.id, {
        id: data.id,
        status: 0
      }).then(res => {
        this.$message.success('操作成功！')
        this.fetchData()
      })
    },
    disableAccount(scope) {
      const data = Object.assign({}, scope.row)
      updateUser(data.id, {
        id: data.id,
        status: 1
      }).then(res => {
        this.$message.success('操作成功！')
        this.fetchData()
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.form-query {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>

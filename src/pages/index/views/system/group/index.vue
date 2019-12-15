<template>
  <div class="app-container">
    <app-table :table-data="tableData" :row-select="false" @pagerChange="fetchData">
      <div slot="header-right">
        <el-button plain @click="addGroup">新增用户组</el-button>
      </div>
      <el-table-column prop="groupName" label="用户组名称" width="120"></el-table-column>
      <el-table-column prop="adminCount" label="帐号数" width="120">
        <template slot-scope="scope">
          <router-link :to="{ path: '/system/user', query: { groupId: scope.row.id, adminStatus: 0 }}">{{ scope.row.adminCount }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="() => editGroup(scope)">修改用户组</el-button>
          <el-button type="text" @click="() => deleteGroup(scope)">删除</el-button>
        </template>
      </el-table-column>
    </app-table>
  </div>
</template>

<script>
import {
  getUsersByRole,
  createUserGroups,
  getUserGroups
} from '@/api/user'

export default {
  data() {
    return {
      query: {
        page: 1,
        size: 10
      },
      tableData: {},
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(pager = {}) {
      getUserGroups(pager).then(res => {
        res.response.records = res.response.records.map((item) => {
          item.adminIds = item.admins ? item.admins.map(r => r.id) : []
          return item
        })
        this.tableData = res.response
      })
    },
    addGroup() {
      this.$message.error('您没有该操作权限')
    },
    editGroup(scope) {
      this.$message.error('您没有该操作权限')
    },
    deleteGroup(scope) {
      this.$confirm(`是否确定删除该用户组？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.error('您没有该操作权限')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

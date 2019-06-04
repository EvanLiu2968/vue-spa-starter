<template>
  <div class="app-container">
    <el-form v-model="query" label-width="72px" label-position="left">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="操作员">
            <el-input v-model="query.creatorName" placeholder="输入关键字"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="被操作人">
            <el-input v-model="query.operStaffId" placeholder="输入关键字"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="操作时间">
            <el-date-picker v-model="query.timeRange" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="操作类型">
            <el-select v-model="query.operType" placeholder="请选择" style="width: 100%">
              <el-option key="all" label="全部" :value="undefined"></el-option>
              <template v-for="(item, i) in operTypes">
                <el-option :key="i" :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="操作内容">
            <el-input v-model="query.operRemark" placeholder="输入关键字"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="fetchData">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <app-table :table-data="tableData" :row-select="false" @pagerChange="pagerChange">
      <el-table-column prop="createdAdminName" label="操作人" width="100"></el-table-column>
      <el-table-column prop="operModule" label="操作模块" width="80"></el-table-column>
      <el-table-column prop="operType" label="操作类型" width="80">
        <template slot-scope="scope">{{ scope.row.operType | operTypeFilter }}</template>
      </el-table-column>
      <el-table-column prop="operStaffId" label="被操作人" width="80"></el-table-column>
      <el-table-column prop="createdTime" label="操作时间" width="140">
        <template slot-scope="scope">{{ scope.row.createdTime | dateFilter }}</template>
      </el-table-column>
      <el-table-column prop="operRemark" label="操作内容"></el-table-column>
      <el-table-column prop="operDetail" label="原有值" :show-overflow-tooltip="true" ></el-table-column>
      <el-table-column prop="operDetailAfter" label="修改值" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="creatorIp" label="IP地址" width="120"></el-table-column>
      <div slot="header-right">
        <!-- <el-button plain @click="printTableRow">打印</el-button> -->
      </div>
    </app-table>
  </div>
</template>

<script>
import { getSysOperLogList } from '@/api/admin'
import { dateFilter } from '@/libs/filter'

const operTypes = [
  { id: '1', name: '新建' },
  { id: '2', name: '编辑' },
  { id: '3', name: '删除' },
  { id: '4', name: '查询' },
  { id: '5', name: '导入' },
  { id: '6', name: '导出' },
  { id: '7', name: '统计' },
  { id: '8', name: '未知访问类型' },
  { id: '9', name: '登陆' }
]
export default {
  filters: {
    dateFilter,
    operTypeFilter(val) {
      const i = operTypes.findIndex(r => r.id == val)
      return operTypes[i] ? operTypes[i].name : '-'
    }
  },
  data() {
    return {
      operTypes,
      query: {
        page: 1,
        size: 10,
        creatorName: '',
        operStaffId: '',
        operType: '',
        timeRange: [],
        operRemark: ''
      },
      tableData: {}
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData(resetPage = true) {
      if (resetPage) {
        this.query.page = 1
      }
      const { timeRange, ...query } = this.query
      if (timeRange && timeRange.length === 2) {
        query.createdTimeBegin = timeRange[0]
        query.createdTimeEnd = timeRange[1]
      }
      getSysOperLogList(Object.assign({}, query)).then(res => {
        this.tableData = res.response
      })
    },
    pagerChange(pager) {
      this.query.page = pager.page
      this.query.size = pager.size
      this.fetchData(false)
    },
    printTableRow() {
      this.$message.error('Request failed with status code 404')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

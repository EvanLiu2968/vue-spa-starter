
<template>
  <div class="full-container border">
    <div class="el-tabs el-tabs--top el-tabs--border-card">
      <div class="el-tabs__header is-top">
        <div class="el-tabs__nav-wrap is-top">
          <div class="el-tabs__nav-scroll">
            <div role="tablist" class="el-tabs__nav is-top" style="transform: translateX(0px);">
              <div
                v-for="(item, i) in types"
                :key="i"
                role="tab"
                tabindex="0"
                class="el-tabs__item is-top"
                :class="{'is-active': item.id === messageType}"
                @click="() => handleClick(item, i)">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="el-tabs__content">
        <div role="tabpanel" class="el-tab-pane">
          <div class="app-container">
            <el-form :inline="true" v-model="query">
              <el-form-item v-if="messageType === 2" label="类别">
                <el-select v-model="query.mesCategory" placeholder="请选择" style="width: 150px">
                  <el-option label="全部" :value="undefined"></el-option>
                  <el-option v-for="(item, i) in mesCategorys" :key="i" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-else label="类别">
                <el-select v-model="query.affairType" placeholder="请选择" style="width: 150px">
                  <el-option label="全部" :value="undefined"></el-option>
                  <el-option v-for="(item, i) in affairTypes" :key="i" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="messageType === 2" label="状态">
                <el-select v-model="query.checkStatus" placeholder="请选择" style="width: 80px">
                  <el-option label="全部" :value="undefined"></el-option>
                  <el-option label="未读" :value="0"></el-option>
                  <el-option label="已读" :value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="时间">
                <el-date-picker v-model="query.timeRange" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss" style="width: 360px"/>
              </el-form-item>
              <el-button type="primary" @click="fetchData">搜索</el-button>
            </el-form>
            <app-table :table-data="tableData" :row-select="false" @pagerChange="fetchData">
              <el-table-column prop="recId" label="序号" width="80">
                <template slot-scope="scope">
                  <span>{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="title" label="类别" width="160">
                <template slot-scope="scope">
                  <span>{{ scope.row.title }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="content" label="消息内容">
                <template slot-scope="scope">
                  <a href="javascript:void(0)" class="text-ellipsis" @click.prevent="() => jumpToPage(scope.row)">{{ scope.row.content }}</a>
                </template>
              </el-table-column>
              <el-table-column prop="checkStatus" label="状态" width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.checkStatus === 0 ? '未读' : '已读' }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="createDate" label="时间" width="140">
                <template slot-scope="scope">{{ scope.row.createDate | dateFilter }}</template>
              </el-table-column>
              <el-table-column prop="recId" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.checkStatus === 0" type="text" @click="() => updateTableRow(scope.row)">已读</el-button>
                </template>
              </el-table-column>
            </app-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  updateMessageAlert,
  getMessageList
} from '@/api/message'
import { jumpToMessageDetail } from './modules/message'
import { dateFilter } from '@/libs/filter'

const affairTypes = [
  { id: 'SWDBLB_CLSBSQ', name: '材料上报申请' },
  { id: 'SWDBLB_CLGD', name: '材料归档' },
  { id: 'SWDBLB_DASM', name: '档案扫描' },
  { id: 'SWDBLB_CYSQ', name: '查阅申请' },
  { id: 'SWDBLB_JYSQ', name: '借阅申请' }
]
const mesCategorys = [
  { id: 'XXTXLB_CYSQSPTGTX', name: '查阅申请审批通过提醒' },
  { id: 'XXTXLB_JYSQSPTGTX', name: '借阅申请审批通过提醒' },
  { id: 'XXTXLB_JYGHTX', name: '借阅归还提醒' }
]

export default {
  filters: {
    dateFilter,
    affairTypeFilter(val) {
      const i = affairTypes.findIndex(r => r.id == val)
      return affairTypes[i].name
    }
  },
  data() {
    return {
      types: [
        {
          id: 0,
          name: '待办'
        },
        {
          id: 1,
          name: '已办'
        },
        {
          id: 2,
          name: '消息'
        }
      ],
      affairTypes,
      mesCategorys,
      messageType: this.$route.query.type ? parseInt(this.$route.query.type) : 0,
      query: {
        page: 1,
        size: 10,
        affairType: undefined,
        mesCategory: undefined,
        checkStatus: 0,
        timeRange: []
      },
      tableData: {}
    }
  },
  watch: {
    '$route': {
      handler() {
        this.messageType = this.$route.query.type ? parseInt(this.$route.query.type) : 0
        this.tableData = {}
        this.query = {
          page: 1,
          size: 10,
          affairType: undefined,
          checkStatus: 0,
          timeRange: []
        }
        this.fetchData()
      },
      deep: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleClick(item, i) {
      this.$router.replace({
        path: '/message',
        query: {
          type: item.id
        }
      })
    },
    fetchData(pager = {}) {
      const { timeRange, ...query } = this.query
      if (timeRange && timeRange.length === 2) {
        query.startTime = timeRange[0]
        query.endTime = timeRange[1]
      }
      getMessageList(this.messageType, Object.assign({
        workStatus: this.messageType
      }, query, pager)).then(res => {
        if (res.response.list) {
          this.tableData = {
            total: res.response.list.length,
            records: res.response.list
          }
          return
        }
        this.tableData = res.response
      })
    },
    updateTableRow(row) {
      updateMessageAlert(this.messageType, row.recId).then(res => {
        this.fetchData()
        this.$store.dispatch('UpdateMessage')
      })
    },
    jumpToPage(item) {
      jumpToMessageDetail(item)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

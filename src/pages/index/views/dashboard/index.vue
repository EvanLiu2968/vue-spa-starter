<template>
  <div class="app-container bg-none">
    <h2 class="dashboard-title">欢迎使用后台管理系统</h2>
    <div>
      <el-row :gutter="50">
        <el-col :span="24" style="margin-bottom: 30px">
          <chart-dangan></chart-dangan>
        </el-col>
        <el-col :span="24" style="margin-bottom: 30px">
          <chart-chayue></chart-chayue>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ChartDangan from '../chart/modules/dangan'
import ChartChayue from '../chart/modules/chayue'
import {
  getDashboardMessage
} from '@/api/message'
import { jumpToMessageDetail } from './modules/message'
import { dateFilter } from '@/libs/filter'

export default {
  components: {
    ChartDangan,
    ChartChayue
  },
  filters: {
    dateFilter
  },
  data() {
    return {
      borad: {
        todo: [],
        done: [],
        message: []
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getDashboardMessage().then(res => {
        this.borad = {
          todo: res.response.homePageDisplay.affairComissionResponses,
          done: res.response.homePageDisplay.comissionResponses,
          message: res.response.homePageDisplay.messageAlertResponses
        }
      })
    },
    jumpToPage(item) {
      jumpToMessageDetail(item)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~THEME_VAR.scss";
.dashboard-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
}
.boradWrap {
  background: #fff;
  min-height: 350px;
  &-head {
    padding: 15px;
    border-bottom: 1px solid $borderGray;
  }
  &-title {
    padding-left: 6px;
    border-left: 4px solid $color-primary;
    font-size: 16px;
    font-weight: bold;
  }
  &-link {
    font-size:12px;
    color: $color-primary;
    line-height: 18px;
  }
  &-body {
    position: relative;
  }
}
.borad-item {
  padding: 10px 15px;
  line-height: 1.6;
  color: #666;
  // border-bottom: 1px solid $borderGray;
  &:hover {
    background: $bgGray;
  }
  &-link {
    color: $fontBlue;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>

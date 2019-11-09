<template>
  <div class="app-container">
    <h2 class="dashboard-title">欢迎使用！</h2>
    <v-chart :options="chartData"/>
  </div>
</template>

<script>
import { StockData } from './mockData'

export default {
  data() {
    return {
      chartData: StockData
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      //
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

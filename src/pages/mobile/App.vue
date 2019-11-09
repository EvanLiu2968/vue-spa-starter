<template>
  <div id="app">
    <div class="app-container">
      <p class="empty-text">这里空空如也(┬＿┬)</p>
      <div class="btn btn-primary" @click="goToHome">回到首页</div>
    </div>
  </div>
</template>

<script>
import { dateFilter } from '@/libs/filter'

export default {
  name: 'App',
  filters: {
    dateFilter
  },
  data() {
    return {}
  },
  mounted() {
  },
  methods: {
    goToHome() {
      window.location.href = '/'
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.app-container {
  margin: 0 auto;
  padding-top: 100px;
  text-align: center;
  .empty-text {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .btn {
    display: inline-block;
    padding: 8px 10px;
    min-width: 120px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    &-primary {
      color: #fff;
      background: #6684EC;
    }
  }
}
</style>

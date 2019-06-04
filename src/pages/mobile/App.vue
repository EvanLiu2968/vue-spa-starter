<template>
  <div id="app">
    移动端
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
@import "~THEME_VAR.scss";
</style>

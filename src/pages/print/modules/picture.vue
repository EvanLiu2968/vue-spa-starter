<template>
  <div>
    <img :src="imageUrl" class="printer-image">
  </div>
</template>

<script>
import { getQuery } from '@/libs/tool'
import { getRealFileUrl } from '@/libs/env'

export default {
  name: 'App',
  data() {
    const query = getQuery(window.location.search)
    return {
      picPath: query.picPath
    }
  },
  computed: {
    imageUrl() {
      return this.picPath ? getRealFileUrl(this.picPath) : ''
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$nextTick(() => {
        this.$emit('complete')
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "~THEME_VAR.scss";
</style>

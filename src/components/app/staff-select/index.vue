<template>
  <el-select
    :remote-method="remoteMethod"
    :loading="loading"
    v-model="value"
    clearable
    filterable
    remote
    placeholder="请输入关键字"
    @change="onChange">
    <el-option
      v-for="item in list"
      :key="item.recId"
      :label="item.staffName"
      :value="item.recId">
      <div>{{ item.staffName }} - {{ item.departName }}<span v-if="item.duty"> - {{ item.duty }}</span></div>
    </el-option>
  </el-select>
</template>

<script>
import {
  getStaffMainList
} from '@/api/staff'

export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      value: ''
    }
  },
  mounted() {
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        getStaffMainList({
          isPage: true,
          departId: '',
          keyWord: query
        }).then(res => {
          this.loading = false
          this.list = res.response.records
        })
      } else {
        this.list = []
      }
    },
    onChange(value) {
      this.$emit('input', value)
      const current = this.list.find(item => item.recId === value)
      this.$emit('change', current)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "~THEME_VAR.scss";
</style>

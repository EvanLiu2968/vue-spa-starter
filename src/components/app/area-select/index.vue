<template>
  <el-select
    v-model="query"
    :remote-method="remoteMethod"
    :loading="loading"
    filterable
    remote
    placeholder="请输入关键字"
    @change="onChange"
  >
    <el-option
      v-for="item in list"
      :key="item.code"
      :label="item.name"
      :value="item.code"
    >
    </el-option>
  </el-select>
</template>

<script>
import { queryDistrict } from '@/api/sysCode'

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: [String, Number],
    defaultLabel: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      query: this.defaultLabel || this.value,
      list: []
    }
  },
  watch: {
    // value(val, oldVal) {
    //   // this.query = val
    // },
    defaultLabel(val, oldVal) {
      this.query = val
    }
  },
  mounted() {
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        queryDistrict({ str: query }).then(res => {
          this.loading = false
          this.list = res.response.records
        })
      } else {
        this.list = []
      }
    },
    onChange(value) {
      this.$emit('input', value)
      this.$emit('change', value)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "~THEME_VAR.scss";
</style>

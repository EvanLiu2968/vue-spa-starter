<template>
  <div>
    <textarea class="t-textarea2" :placeholder="placeholder" @input="changeHandler" @keydown="valChange" :rows="rows" :cols="cols" :value="value2" :disabled="disabled"></textarea>
  </div>
</template>

<script>
/**
 * 高级搜索的文本域
 * 会自动将换行符拼接成 ','
 */
export default {
  inject: {
    'formItem': {
      default: null
    }
  },
  props: {
    value: {
      type: [String, Array],
      default: null
    },
    cols: {
      type: String,
      default: '30'
    },
    rows: {
      type: String,
      default: '4'
    },
    placeholder: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isArray() {
      return this.value instanceof Array
    },
    value2() {
      if (this.isArray) {
        return this.value.join('\n')
      }
      return String(this.value).replace(/\,/g, '\n')
    }
  },
  methods: {
    valChange(e) {
      const val = String(e.target.value).split('\n').filter(item => item !== '').map(item => item.trim())
      if (val && val.length >= 1000) { // 超过1000禁止输入
        if (e.keyCode === 13) {
          e.preventDefault()
        }
      }
    },
    changeHandler(e) {
      let val = String(e.target.value).split('\n').filter(item => item !== '').map(item => item.trim())
      if (val && val.length >= 1000) { // 超过1000的部分截取前1000行
        val = val.slice(0, 1000)
        this.$message.warning('您当前输入超过1000行，系统只为您保留前1000行的内容')
      }
      this.$emit('input', this.isArray ? val : val.join(','))
      if (this.formItem) {
        this.formItem.$emit('input.input')
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.t-textarea2{
  border: 1px solid #e3e3e3;
  padding: 5px;
}
</style>

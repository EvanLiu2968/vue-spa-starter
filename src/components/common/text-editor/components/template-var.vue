<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link" style="line-height:28px;cursor:pointer">
      插入模板变量<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown" style="min-width:100px">
      <div v-if="templates.length === 0" class="text-mini text-center text-secondary" style="padding:20px">没有数据</div>
      <el-dropdown-item v-else v-for="item in templates" :key="item.code" :command="item.code">{{ item.name }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>

const templates = [
  // { code: 'receiver', name: '收件人邮箱' }
]

export default {
  name: 'EditorSlideTemplate',
  props: {
    tinymceId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      templates
    }
  },
  methods: {
    handleCommand(command) {
      const commadName = templates.find(v => v.code == command).name
      const style = ``
      window.tinymce.get(this.tinymceId).insertContent(`<span class="tag-template-var" style="${style}" data-template-var="${command}">${commadName}</span>`)
    }
  }
}
</script>

<style lang="scss">
</style>

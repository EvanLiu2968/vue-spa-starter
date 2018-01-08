<template>
  <div>
    <div class="component-tips">
      自定义封装的一些指令
    </div>
    <h3 class="component-title">水波纹按钮</h3>
    <el-button v-waves type="primary">水波纹效果</el-button>
    <el-button v-waves type="success">水波纹效果</el-button>
    <el-button v-waves type="danger">水波纹效果</el-button>
    <el-button v-waves type="warning">水波纹效果</el-button>
    <el-button v-waves type="info">水波纹效果</el-button>
  </div>
</template>

<script>
  export default {
    data: function(){
      return {
      }
    },
    computed:{
    },
    beforeMount(){
    }
  }
</script>

<style scoped>
</style>
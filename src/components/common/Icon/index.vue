<template>
  <i :class="iconClass">
    <slot/>
  </i>
</template>

<script>
import '@/assets/icons/iconfont.css' // 项目需要内网发布只能用本地资源

// import { createRemoteCSS } from '@/libs/tool'
// if (window !== undefined) {
//   const iconCDN = '//at.alicdn.com/t/font_1115022_y37hho71qt.css'
//   createRemoteCSS(iconCDN, () => {
//     console.log(`图标已加载：${iconCDN}`)
//   })
// }

export default {
  name: 'Icon',
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconClass() {
      return this.type ? 'el-icon-' + this.type : ''
    }
  }
}
</script>

<style>
[class*=" el-icon-sys-"], [class^=el-icon-sys-] {
  font-family: 'iconfont' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

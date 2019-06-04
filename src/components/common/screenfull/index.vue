<template>
  <div v-if="showFullscreen">
    <i :class="isFullscreen ? 'el-icon-sys-tuichuquanping' : 'el-icon-sys-quanping3'" @click="toggleFullscreen" />
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    }
  },
  computed: {
    showFullscreen() {
      const ua = window.navigator.userAgent.toLowerCase() // 360兼容模式有奇怪的bug，不好判定是360，所以非chrome核都禁用了
      console.log(ua)
      return ua.indexOf('chrome') > 1
      // if (ua.indexOf('compatible') !== -1) {
      //   return false
      // }
      // return !!screenfull.enabled
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', () => {
          this.isFullscreen = screenfull.isFullscreen
        })
      }
    },
    toggleFullscreen() {
      if (!screenfull.enabled) {
        window.alert('该浏览器不支持全屏功能！')
        return false
      }
      screenfull.toggle()
    }
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>

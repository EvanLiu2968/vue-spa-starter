<template>
  <div :style="getStyle">
    <div class="wrap" :style="{backgroundColor: `rgba(255,255, 255, ${opacity})`}">
      <div
        class="el-loading-spinner"
        :class="{'is-full-screen':fullscreen}"
        :style="{
          position: 'absolute',
          display:'inline-block',
          left:0
      }">
        <template v-if="type === 'circular'">
          <svg class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" />
          </svg>
        </template>
        <template
          v-if="type === 'comet'">
          <div class="el-loading-comet">
            <div class="loader"></div>
          </div>
        </template>
        <template v-if="type === 'swell'">
          <div class="el-loading-swell">
            <div class="loader"></div>
          </div>
        </template>
        <template v-if="type === 'stretch'">
          <svg class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" />
          </svg>
        </template>
        <p v-if="text" class="el-loading-text">{{ text }}</p>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import './index.scss'

// docs: http://www.evanliu2968.com.cn/react-component/#/zh-CN/loading
let startShowTime = 0

export default {
  name: 'AppLoading',
  data() {
    return {
      type: 'circular',
      text: '正在加载中',
      opacity: 0.5,
      minShowTime: 500, // 最小显示时间，避免一闪而过
      fullscreen: false,
      loading: false,
      didMount: false
    }
  },
  computed: {
    getStyle() {
      if (this.fullscreen) {
        this.disableScroll()

        return {
          display: this.loading ? 'block' : 'none',
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 99999
        }
      } else {
        this.enableScroll()

        return {
          position: 'relative'
        }
      }
    }
  },
  mounted() {
    this.didMount = true
  },
  methods: {
    documentBody() {
      if (typeof window !== 'undefined') {
        return document.body
      }
    },

    disableScroll() {
      // const documentBody = this.documentBody()
      // if (documentBody) {
      //   documentBody.style.setProperty('overflow', 'hidden')
      // }
    },

    enableScroll() {
      const documentBody = this.documentBody()
      if (documentBody) {
        documentBody.style.removeProperty('overflow')
      }
    },
    show() {
      this.loading = true
      startShowTime = new Date()
    },
    hide() {
      const gap = new Date() - startShowTime
      if (gap < this.minShowTime) {
        setTimeout(() => {
          this.loading = false
          if (this.fullscreen) {
            this.enableScroll()
          }
        }, this.minShowTime - gap)
      } else {
        this.loading = false
        if (this.fullscreen) {
          this.enableScroll()
        }
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.wrap {
  display: block;
  position: absolute;
  z-index: 657;
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0
}
</style>

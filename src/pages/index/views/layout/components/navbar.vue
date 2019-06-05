<template>
  <div class="navbar">
    <div class="app-logo">
      <img :src="themeOptions.logo">
      <h1 :class="theme" class="app-logo-title">后台管理系统</h1>
    </div>
    <div class="right-menu">
      <div class="right-menu-item item-message" :style="{marginRight: !message.count || message.count === 0 ? '0' : '20px'}">
        <router-link to="/message?type=2" style="color: #fff" title="消息提醒">
          <el-badge :value="message.count" :max="99" :hidden="!message.count || message.count === 0">
            <i class="el-icon-sys-tongzhi"></i>
          </el-badge>
        </router-link>
      </div>
      <div class="right-menu-item">
        <screenfull></screenfull>
      </div>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="defaultAvatar" class="user-avatar">
          <span class="user-name">{{ userinfo ? userinfo.adminName : '默认用户' }}</span>
          <i class="el-icon-caret-bottom" style="top:15px;"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item>
            <span style="display:block;" @click="logout">退出登陆</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/common/breadcrumb'
import Hamburger from '@/components/common/hamburger'
import Screenfull from '@/components/common/screenfull'
import defaultAvatar from '@/assets/images/avatar.jpg'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull
  },
  data() {
    return {
      // eslint-disable-next-line no-undef
      theme: THEME,
      defaultAvatar
    }
  },
  computed: {
    ...mapGetters([
      'message',
      'userinfo'
    ]),
    themeOptions() {
      return {
        logo: `/static/images/${this.theme}/logo.png`
      }
    }
  },
  created() {
    this.$store.dispatch('UpdateSysCode')
  },
  mounted() {
    console.log(this.userinfo)
    this.getCycleMessage(10)
  },
  methods: {
    getCycleMessage(s) {
      this.$store.dispatch('UpdateMessage')
      return setInterval(() => {
        this.$store.dispatch('UpdateMessage')
      }, s * 1000)
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        // location.reload() // 为了重新实例化vue-router对象 避免bug
        window.location.href = '/' // fix: 退出登录后回到首页
      })
    }
  }
}
</script>

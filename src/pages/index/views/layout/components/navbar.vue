<template>
  <div class="navbar">
    <div class="app-logo">
      <img src="/images/logo-text.png" >
    </div>
    <div class="pull-left">
      <!-- <hamburger class="hamburger-container"/> -->
      <breadcrumb/>
    </div>

    <div class="right-menu">

      <div class="right-menu-item">
        <router-link to="/dashboard" title="工作台">
          <span>
            <i class="el-icon-sys-gongzuotai1"></i>
          </span>
        </router-link>
      </div>

      <div class="right-menu-item item-message" :style="{marginRight: !message.count || message.count === 0 ? '0' : '20px'}">
        <router-link to="/usercenter/notice" title="消息">
          <el-badge :value="message.count" :max="99" :hidden="!message.count || message.count === 0">
            <i class="el-icon-sys-xiaoxi"></i>
          </el-badge>
        </router-link>
      </div>

      <div class="right-menu-item">
        <screenfull></screenfull>
      </div>
      <el-dropdown class="avatar-container" trigger="hover" size="medium">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="userinfo.avatar">
          <span class="user-name">{{ userinfo.adminName }}</span>
          <i class="el-icon-caret-bottom" style="top:15px;"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown" style="width: 150px">
          <el-dropdown-item>
            <div @click="() => routePage('/usercenter/userinfo')"><i class="el-icon-sys-user"></i>基本设置</div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="() => routePage('/usercenter/password')"><i class="el-icon-sys-icon-lock"></i>密码设置</div>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <div @click="logout"><i class="el-icon-sys-logout"></i>退出登录</div>
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

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'message',
      'userinfo'
    ]),
    settingMenu() {
      const list = [
        {
          permission: [329],
          name: '人员组织',
          icon: 'el-icon-sys-ren',
          route: '/team',
          type: 'app'
        },
        {
          permission: [187],
          name: '画像库',
          icon: 'el-icon-sys-huaxiang',
          route: '/portrait',
          type: 'app'
        },
        {
          permission: [],
          name: '模型库',
          icon: 'el-icon-sys-moxingku',
          route: '/model',
          type: 'app'
        },
        {
          permission: [193],
          name: '用户管理',
          icon: 'el-icon-sys-yonghuguanli2',
          route: '/system/user',
          type: 'system'
        },
        {
          permission: [196],
          name: '用户组管理',
          icon: 'el-icon-sys-yonghuzuguanli',
          route: '/system/group',
          type: 'system'
        },
        {
          permission: [194],
          name: '角色管理',
          icon: 'el-icon-sys-jiaose',
          route: '/system/role',
          type: 'system'
        },
        {
          permission: [361],
          name: '标签管理',
          icon: 'el-icon-sys-biaoqianguanli',
          route: '/system/tag',
          type: 'system'
        }
      ]
      const map = {
        app: [],
        system: []
      }
      list.forEach(item => {
        if (!item.permission || item.permission.length == 0) {
          map[item.type].push(item)
          return
        }
        for (let i = 0; i < item.permission.length; i++) {
          if (this.userinfo.permissionCodes.find(v => v.id == item.permission[i])) {
            map[item.type].push(item)
            return
          }
        }
      })
      return {
        app: map['app'],
        system: map['system']
      }
    }
  },
  mounted() {
    // this.getCycleMessage(10)
  },
  methods: {
    getCycleMessage(s) {
      this.$store.dispatch('UpdateMessage')
      return setInterval(() => {
        this.$store.dispatch('UpdateMessage')
      }, s * 1000)
    },
    routePage(path) {
      this.$router.push({
        path
      })
    },
    logout() {
      this.$store.dispatch('LogOut').then((r) => {
        // location.reload() // 为了重新实例化vue-router对象 避免bug
        window.location.href = '/' // fix: 退出登录后回到首页
      })
    }
  }
}
</script>

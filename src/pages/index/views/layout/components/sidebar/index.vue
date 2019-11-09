<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div style="position:absolute;left:0;top:45px;width:100%;height:50px;padding:0 10px;background:#fff">
      <hamburger class="hamburger-container" style="line-height: 60px;height:50px"/>
    </div>
    <el-menu
      :default-active="menuActive"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from 'THEME_VAR.scss'
import SidebarItem from './sidebar-item'
import Hamburger from '@/components/common/hamburger'

export default {
  components: {
    Hamburger,
    SidebarItem
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    menuActive() {
      if (this.$route.meta && this.$route.meta.parentPath) {
        return this.$route.meta.parentPath
      }
      return this.$route.path
    }
  }
}
</script>

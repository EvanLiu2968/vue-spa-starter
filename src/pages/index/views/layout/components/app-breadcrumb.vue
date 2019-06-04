<template>
  <div class="app-breadcrumb-container border-b">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <breadcrumb/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/common/breadcrumb'
import Hamburger from '@/components/common/hamburger'

export default {
  components: {
    Hamburger,
    Breadcrumb
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    }
  }
}
</script>

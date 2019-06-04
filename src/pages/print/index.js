import Vue from 'vue'

import '@/libs/extend'
import App from './App'

import '@/styles/element-theme.scss'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})

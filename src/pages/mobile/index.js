import Vue from 'vue'

import '@/styles/reset.css' // reset css or normalize.css
import '@/libs/extend'

import App from './App'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})

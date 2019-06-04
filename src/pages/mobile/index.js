import Vue from 'vue'

import '@/styles/reset.css' // reset css or normalize.css
import '@/libs/extend'

import ElementUI from 'element-ui'

Vue.use(ElementUI, {
  size: 'mini' // mini small medium
})

import 'THEME.scss' // global css

import CustomComponents from '@/components/common'
Vue.use(CustomComponents, {})

import App from './App'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})

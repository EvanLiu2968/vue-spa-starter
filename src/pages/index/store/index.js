import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import staff from './modules/staff'
import sys from './modules/sys'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    staff,
    sys,
    user
  },
  getters
})

export default store

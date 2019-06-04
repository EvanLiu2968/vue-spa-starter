import {
  getMessageCount
} from '@/api/message'
import {
  searchSysCodeCategory
} from '@/api/sysCode'

const sys = {
  state: {
    sysCode: {},
    message: {
      count: 0
    }
  },
  mutations: {
    SET_MESSAGE: (state, data) => {
      state.message.count = data
    },
    SET_SYS_CODE: (state, data) => {
      state.sysCode = data
    }
  },
  actions: {
    UpdateMessage({ commit }) {
      getMessageCount().then(res => {
        commit('SET_MESSAGE', res.response)
      })
    },
    UpdateSysCode({ commit }) {
      searchSysCodeCategory().then(res => {
        commit('SET_SYS_CODE', res.response)
      })
    }
  }
}

export default sys

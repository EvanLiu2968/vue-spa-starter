import {
  getSystemConfig,
  getMessageCount
} from '@/api/system'

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
      getSystemConfig().then(res => {
        commit('SET_SYS_CODE', res.response)
      })
    }
  }
}

export default sys

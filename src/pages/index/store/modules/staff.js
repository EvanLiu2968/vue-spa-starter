import {
  getStaffMainInformationSelect
} from '@/api/staff'

const staff = {
  state: {
    staffInfo: null,
    staffDetail: null
  },
  mutations: {
    SET_STAFF_INFO: (state, data) => {
      state.staffInfo = data
    },
    SET_STAFF_DETAIL: (state, data) => {
      state.staffDetail = data
    }
  },
  actions: {
    SetStaffInfo({ commit }, data) {
      commit('SET_STAFF_INFO', data)
    },
    SetStaffDetail({ commit }, data) {
      commit('SET_STAFF_DETAIL', data)
    },
    UpdateStaffDetail({ commit }, staffId) {
      getStaffMainInformationSelect(staffId).then(res => {
        if (res.response.degrees) {
          res.response.degrees = res.response.degrees.map(item => {
            item.degreeDateRange = [item.beginTime || '', item.endTime || '']
            return item
          })
        }
        commit('SET_STAFF_DETAIL', res.response)
      })
    }
  }
}

export default staff

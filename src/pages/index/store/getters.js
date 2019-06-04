const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  sysCode: state => state.sys.sysCode,
  message: state => state.sys.message,
  staffInfo: state => state.staff.staffInfo,
  staffDetail: state => state.staff.staffDetail,
  token: state => state.user.token,
  userinfo: state => state.user.userinfo
}
export default getters

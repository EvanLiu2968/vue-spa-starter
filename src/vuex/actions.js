//同$store.commit('loginIn', {name: 'admin'});
export const loginIn = ({commit},userInfo) => {
  commit('loginIn',userInfo)
}
export const loginOut = ({commit}) => {
  commit('loginOut')
}
export const toggleCollapse = ({commit}) => {
  commit('toggleCollapse')
  commit('loginOut')
}

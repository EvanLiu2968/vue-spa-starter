/**
 * 全局通用字典表（其余部分从数据库取，初始化时加载在$store.getters.sysCode）
 * 注意不要在业务中直接修改对象，ES6 model是引用状态，如有需要可以deepclone
 */
// 性别
export const sexMap = {
  '1': '男',
  '2': '女'
}

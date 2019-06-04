/**
 * created at 2019年4月16日11:52:00
 *
 */
import { sexMap } from './dictionaryMap'
/**
 *
 *
 * @param {*} time
 * @param {string} [format='yyyy-MM-dd HH:mm:ss']
 * @returns
 */
export function dateFilter(time, format = 'yyyy-MM-dd HH:mm:ss') {
  if (!time) {
    return '-'
  }
  const date = new Date(time)
  if (date instanceof Date && !isNaN(date.getTime())) {
    return date.format(format)
  }
  return '-'
}
/**
 *
 *
 * @param {*} time
 * @returns
 */
export function timeAgoFilter(time) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
}
/**
 *
 *
 * @param {*} sex
 * @returns
 */
export function sexFilter(val) {
  return sexMap[val] || '-'
}
export function archivesStatusFilter(status = 0) { // 档案状态
  const statusMap = {
    0: '缺档',
    1: '在库',
    2: '调出',
    3: '借出'
  }
  return statusMap[status] || '-'
}
export function auditStatusFilter(status = 0, type = 'icon') {
  const statusMap = {
    0: {
      icon: 'el-icon-sys-shenheweisuoding',
      title: '待审核'
    },
    1: {
      icon: 'el-icon-sys-shenheyisuoding text-blue',
      title: '审核中'
    },
    2: {
      icon: 'el-icon-sys-shenhewanbiweiqueren',
      title: '审核未通过'
    },
    3: {
      icon: 'el-icon-sys-shenhewanbiyiqueren text-blue',
      title: '审核已通过'
    }
  }
  if (type == 'title') {
    return statusMap[status] ? statusMap[status].title : ''
  }
  return statusMap[status] ? statusMap[status].icon : ''
}

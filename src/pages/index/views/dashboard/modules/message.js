import router from '@/pages/index/router'

export function jumpToMessageDetail(item) {
  if (!item.affairType) {
    return
  }
  // 材料上报申请
  if (item.affairType === 'SWDBLB_CLSBSQ') {
    router.push({
      path: '/archive/material',
      query: {
        taskId: item.taskId
      }
    })
  }
  // 材料归档
  if (item.affairType === 'SWDBLB_CLGD') {
    router.push({
      path: '/archive/material',
      query: {
        status: 1,
        taskId: item.taskId
      }
    })
  }
  // 档案扫描
  if (item.affairType === 'SWDBLB_DASM') {
    router.push({
      path: '/archive/collect/person',
      query: {
        tab: 'scan',
        staffId: item.taskId
      }
    })
  }
  // 查阅申请
  if (item.affairType === 'SWDBLB_CYSQ') {
    router.push({
      path: '/browse/approval',
      query: {
        taskId: item.taskId
      }
    })
  }
  // 借阅申请
  if (item.affairType === 'SWDBLB_JYSQ') {
    router.push({
      path: '/borrow/approval',
      query: {
        taskId: item.taskId
      }
    })
  }
}

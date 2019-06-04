/**
 * 跟环境有关的配置、方法
 */
// 根据config/{env}.env.js环境配置来定义
// const baseFileHost = process.env.BASE_FILE_HOST
// eslint-disable-next-line no-undef
// const baseFileHost = BASE_FILE_HOST

/**
 *
 *
 * @param {*} path
 * @returns 文件服务地址
 */
export function getRealFileUrl(path) {
  if (!path) {
    return ''
  }
  if (/^\/data\/cas\//.test(path)) {
    path = path.replace('/data/cas/', '')
  }
  if (/^(\/fileService\/|\/static\/)/.test(path)) {
    return path
  }
  // return `${baseFileHost}/${path}`
  return `/fileService/${path}`
}

export function mergeDefaultChartOption(options) {
  const chartTheme = {
    'SouthTalent': ['#f49a37', '#5e7980', '#06323e', '#09a65e', '#47ca88', '#ca9747'],
    'Default': ['#5877ff', '#66a8ff', '#3dc0fe', '#a491e9', '#47ca88', '#ca9747']
  }
  const defaultChartOption = {
    // eslint-disable-next-line no-undef
    color: chartTheme[THEME]
  }
  return Object.assign({}, defaultChartOption, options)
}

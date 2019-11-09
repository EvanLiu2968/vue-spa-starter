/**
 * 跟环境有关的配置、方法
 */

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
  const defaultChartOption = {
    color: ['#5877ff', '#66a8ff', '#3dc0fe', '#a491e9', '#47ca88', '#ca9747']
  }

  return Object.assign({}, defaultChartOption, options)
}

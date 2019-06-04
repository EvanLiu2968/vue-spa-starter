/**
 * Created by zhongquan.liu on 2019/4/13.
 */

/**
 *
 * @returns 随机数ID
 */
export function randomNumberId() {
  const timestamp = +new Date() // 13位
  return parseInt(Math.random() * (9 << 16) + timestamp)
}
/**
 *
 * @returns 随机字符串ID
 */
export function randomStringId() {
  const timestamp = +new Date() + ''
  const randomNum = ~~((1 + Math.random()) * (1 << 16)) + ''
  return (+(randomNum + timestamp)).toString(32)
}
/**
 * R,G,B可取值在0~255,当前设定在128~255
 * @returns 随机颜色
 */
export function randomColor() {
  const R = Math.random() * 127 + 128
  const G = Math.random() * 127 + 128
  const B = Math.random() * 127 + 128
  return '#' + (R << 16 | G << 8 | B).toString(16)
}

/**
 *
 *
 * @param {Object} obj
 * @returns
 */
export function parseClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 *
 *
 * @param {String} [search=window.location.search]
 * @returns
 */
export function getQuery(search = window.location.search) {
  const valueSeparator = ','
  var searchMap = {}
  if (!search) { return searchMap }
  searchMap = search.replace(/^\?/, '').split('&').reduce(function(acc, v, i, a) {
    const key = v.split('=')[0]
    const value = v.split('=')[1]
    if (acc[key]) {
      const arr = acc[key].split(valueSeparator)
      arr.push(value)
      acc[key] = arr.join(valueSeparator)
    } else {
      acc[key] = value + '' // 防止提交数字格式
    }
    return acc
  }, {})
  return searchMap
}

/**
 *
 *
 * @param {String} url
 * @param {Object} params
 * @returns
 */
export function serializeParam(url, params) {
  if (!params) return url
  const qstr = []
  console.log(params)
  for (const k in params) {
    const notEmpty = params[k] !== null && params[k] !== undefined
    const value = notEmpty ? encodeURIComponent(params[k]) : ''
    if (notEmpty) {
      qstr.push(encodeURIComponent(k) + '=' + value)
    }
  }
  return url + '?' + qstr.join('&')
}
export function appendToHead(el) {
  const head = document.head || document.getElementsByTagName('head')[0]
  head.appendChild(el)
}
export function createRemoteCSS(src, cb) {
  const tag = document.createElement('link')
  tag.onload = tag.onreadystatechange = function() {
    if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
      cb && cb()
    }
  }

  if (src.lastIndexOf('.css') == -1) src += '.css'
  tag.setAttribute('rel', 'stylesheet')
  tag.setAttribute('href', src)
  appendToHead(tag)
}
export function createRemoteJS(src, cb) {
  const tag = document.createElement('script')
  tag.setAttribute('type', 'text/javascript')
  tag.setAttribute('src', src)

  tag.onload = tag.onreadystatechange = function() {
    if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
      setTimeout(() => {
        cb()
      }, 100)
    }
  }
  appendToHead(tag)
}
/**
 *
 *
 * @param {String} content
 * @param {String} fileName
 */
export function saveBlobAsFile(content, fileName) {
  const blob = new Blob([content], { type: 'application/vnd.ms-excel;charset=UTF-8' })
  if ('download' in document.createElement('a')) { // 非IE下载
    const a = document.createElement('a')
    if (fileName) {
      a.download = fileName
    }
    a.style.display = 'none'
    a.href = URL.createObjectURL(blob)
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(a.href) // 释放URL 对象
    document.body.removeChild(a)
  } else { // IE10+下载
    navigator.msSaveBlob(blob, fileName)
  }
}
/**
 * 下载文件
 *
 * @param {String} url
 * @param {String} fileName
 */
export function downloadFile(url, fileName) {
  window.open(url)
  // const a = document.createElement('a')
  // if (fileName) {
  //   a.setAttribute('download', fileName)
  // }
  // a.setAttribute('href', url)
  // document.body.appendChild(a)
  // a.click()
  // document.body.removeChild(a)
}
/**
 *
 *
 * @param {String} str
 * @returns {Number}
 */
export function getStrLength(str) {
  return str.replace(/[^\x00-\xff]/g, 'aa').length // 将双字节字符替换为单字节字符
}

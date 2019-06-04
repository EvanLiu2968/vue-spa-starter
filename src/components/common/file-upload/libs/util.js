/*
 * @Author: guanyong.yang
 * @Date: 2018-10-22 14:42:34
 * @Last Modified by:   guanyong.yang
 * @Last Modified time: 2018-10-22 14:42:34
 */
/* https://blog.csdn.net/hanshileiai/article/details/44702923 文件类型对照表
ie9 根据返回的type来判断类型，其他浏览器直接通过accept属性

ie中，可以执行input和change事件，而且input事件可以连续上传同一个文件
其他浏览器，input事件不会执行，只能执行change事件，所以除了ie，其他浏览器不能上传再修改再上传再保存

ie9不能用formData 必须用form.submit() 和 ifrmae.onload ，缺点是拿不到进度
ie9以上可以用formData 加 xhr, 用xhr.load，可以拿到进度

xhr有onload和onerror
proxy错误： 触发onerror，拿不到错误信息
path错误: 触发onload，拿得到错误信息

iframe只有onload事件，
proxy错误： 能拿到错误信息
path 错误： 页面500，拿不到错误信息
综上，需要用try catch
*/

/**
 *
 *
 * @param {*} url
 * @param {*} params
 * @returns
 */
export function serializeParam(url, params) {
  if (!params) return url
  const qstr = []
  for (const k in params) {
    const notEmpty = params[k] !== null && params[k] !== undefined
    const value = notEmpty ? encodeURIComponent(params[k]) : ''
    if (notEmpty) {
      qstr.push(encodeURIComponent(k) + '=' + value)
    }
  }
  return url + '?' + qstr.join('&')
}

function isIE9() {
  return navigator.userAgent.indexOf('MSIE 9.0') > 0
}

function getFile(elInput) {
  if (isIE9()) {
    return elInput.value
  } else {
    if (elInput && elInput.files) {
      return elInput.files
    }
  }
}

function getSrc(elInput, type) {
  const removeFilePath = (str) => { // 去掉本地路径
    return str.split('\\').pop()
  }
  if (isIE9()) {
    elInput.select()
    elInput.blur()
    var nfile = document.selection.createRange().text
    nfile = removeFilePath(nfile)
    document.selection.empty()
    return {
      src: nfile
    }
  } else {
    const URL = window.URL || window.webkitURL
    var src = type === 'img' ? URL.createObjectURL(elInput.files[0]) : elInput.value
    src = removeFilePath(src)
    return {
      src: src
    }
  }
}

function getType(elInput) { // 获取文件类型
  if (isIE9()) {
    elInput.select()
    elInput.blur()
    var nfile = document.selection.createRange().text
    const typeList = nfile.split('.')
    const type = typeList[typeList.length - 1]
    document.selection.empty()
    return type
  } else {
    const typeList = elInput.value.split('.')
    const type = typeList[typeList.length - 1]
    return type
  }
}

function getFileSize(elInput) {
  if (isIE9()) {
    return null
  } else {
    return getFile(elInput).size
  }
}

function getFrameResponseIframeOnload(frame, cb) {
  frame.onload = (e) => {
    try {
      var text = frame.contentDocument.body.innerText
      if (text !== '') {
        const resp = JSON.parse(text)
        cb('load', resp)
      }
    } catch (err) {
      cb('error')
    }
  }
  frame.onerror = (e) => {
    cb('error')
  }
}

function getFrameResponse(frame, cb) {
  var timeIndex = 0
  var timeSet = setInterval(() => {
    timeIndex++
    var text = frame.contentDocument.body.innerText
    if (timeIndex < 1200) {
      if (text !== '') {
        const resp = JSON.parse(text)
        clearInterval(timeSet)
        cb(resp)
      }
    } else {
      clearInterval(timeSet)
      cb({
        code: 500,
        msg: '请求超时'
      })
    }
  }, 250)
}

export default {
  serializeParam, // format url param
  getFile, // 获取文件
  getSrc, // 获取文件名
  getType, // 获取文件类型
  getFileSize, // 获取文件大小
  getFrameResponseIframeOnload, // iframe回调
  getFrameResponse,
  isIE9: isIE9
}

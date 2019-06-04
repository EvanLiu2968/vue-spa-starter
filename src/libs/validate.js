/**
 * global validate
 * ^is\w* @returns {Boolean}
 * ^validate\w* 适用于element UI及iView等的表单验证
 */
// 给路由判断
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
// 是否是移动端
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi/i.test(navigator.userAgent)
}
// 是否是微信,(还可判断是否存在WeixinJSBridge,需在WeixinJSBridgeReady事件后)
export function isWechat() {
  return /micromessenger/i.test(navigator.userAgent) || typeof navigator.wxuserAgent !== 'undefined'
}
// IP地址
export function isIP(value) {
  return /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/.test(value)
}
export function validateIP(rule, value, callback) {
  if (!isIP(value)) {
    callback(new Error('请输入正确的IP'))
  } else {
    callback()
  }
}
// 身份证
export function isIdCardNo(value) {
  var birthday = new Date(value.substr(6, 4) + '-' + value.substr(10, 2) + '-' + value.substr(12, 2)) // 不考虑15位身份证，目前有效身份证均为18位
  return /^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/.test(value) && (birthday < new Date())
}
export function validateIdCardNo(rule, value, callback) {
  if (!isIdCardNo(value)) {
    callback(new Error('请输入正确的身份证号码'))
  } else {
    callback()
  }
}
// 车牌号
export function isPlateNo(value) {
  return /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/.test(value)
}
export function validatePlateNo(rule, value, callback) {
  if (!isPlateNo(value)) {
    callback(new Error('请输入正确的车牌号'))
  } else {
    callback()
  }
}
// 联系电话
export function isTel(value) {
  var tel = /^(\d{3,4}-?)?\d{7,9}$/g
  return tel.test(value)
}
export function validateTel(rule, value, callback) {
  if (!isTel(value)) {
    callback(new Error('请输入正确的电话号码'))
  } else {
    callback()
  }
}
// 联系手机
export function isPhone(value) {
  // var phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
  var phone = /^1\d{10}$/
  return phone.test(value)
}
export function validatePhone(rule, value, callback) {
  if (!isPhone(value)) {
    callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}
// QQ号码
export function isQQ(value) {
  return /^[1-9]\d{4,10}$/.test(value)
}
export function validateQQ(rule, value, callback) {
  if (!isQQ(value)) {
    callback(new Error('请输入正确的QQ号码'))
  } else {
    callback()
  }
}
// 字母开头，长度在6-12之间，只能包含字符、数字和下划线的密码,按需修改。
export function isPassword(value) {
  return /^[a-zA-Z]\w{8,20}$/.test(value)
}
export function validatePassword(rule, value, callback) {
  if (!isPassword(value)) {
    callback(new Error('只能包含字母、数字和下划线，且以字母开头，长度在8-20之间'))
  } else {
    callback()
  }
}
export function validateStrongPassword(rule, value, callback) {
  if (!/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,16}$/.test(value)) {
    callback(new Error('请输入8-16位字符，至少包含数字、大写字母、小写字母、特殊字符中的三种类型'))
  } else {
    callback()
  }
}
// 一个或多个中文
export function isChinese(value) {
  return /^[\u4e00-\u9fa5]+$/.test(value)
}
export function validateChinese(rule, value, callback) {
  if (!isChinese(value)) {
    callback(new Error('请输入中文'))
  } else {
    callback()
  }
}
// 网址
export function isUrl(value) {
  return /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i.test(value)
}
export function validateUrl(rule, value, callback) {
  if (!isUrl(value)) {
    callback(new Error('请输入正确的网址'))
  } else {
    callback()
  }
}
export function isEmail(value) {
  return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
}
export function validateEmail(rule, value, callback) {
  if (!isEmail(value)) {
    callback(new Error('请输入正确的邮箱地址'))
  } else {
    callback()
  }
}
// 大于或等于0的整数或为空
export function isRoundNumber(value) {
  const n = parseInt(value)
  return !value ? true : (n >= 0 && (n === value || n + '' === value))
}
export function validateRoundNumber(rule, value, callback) {
  if (!isRoundNumber(value)) {
    callback(new Error('请输入大于或等于0的整数'))
  } else {
    callback()
  }
}

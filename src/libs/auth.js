import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// const SECRET_KEY = 'EvanLiu2968 is a awesome developer'
// const SECRET_IV = 'I love coding'

/**
 * crypto加密
 * @param {*} data
 * @param {*} [key=defaultKey]
 * @returns
 */
// export function encrypt(str) {
//   const crypto = require('crypto-js')
//   const key = crypto.enc.Base64.parse(SECRET_KEY)
//   const iv = crypto.enc.Base64.parse(SECRET_IV)
//   const srcs = crypto.enc.Utf16LE.parse(str)
//   const encrypted = crypto.TripleDES.encrypt(srcs, key, { iv: iv, mode: crypto.mode.CBC, padding: crypto.pad.Pkcs7 })
//   return encrypted.toString()
// }
/**
 * crypto解密
 * @param {*} encrypted
 * @param {*} [key=defaultKey]
 * @returns
 */
// export function decrypt(str) {
//   const crypto = require('crypto-js')
//   const key = crypto.enc.Base64.parse(SECRET_KEY)
//   const iv = crypto.enc.Base64.parse(SECRET_IV)
//   const decrypted = crypto.TripleDES.decrypt(str, key, { iv: iv, mode: crypto.mode.CBC, padding: crypto.pad.Pkcs7 })
//   return decrypted.toString(crypto.enc.Utf16LE)
// }

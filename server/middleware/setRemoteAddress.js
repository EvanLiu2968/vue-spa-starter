'use strict'
// 中间件处理，后端需要客户端ip，node将ip置于header['x-real-ip']

module.exports = (app) => {
  const { config } = app

  return async function(ctx, next) {
    const { request } = ctx
    const clientIP =  request.headers["x-real-ip"] || request.headers["x-forwarded-for"] || request.ip
    console.log('客户端请求IP：' + clientIP)
    request.headers['x-real-ip'] = clientIP
    // 某些get请求无法在浏览器设置headers，在此处进行处理
    const token = ctx.cookies.get('cas_token')
    if (!request.headers["accessToken"] && token) {
      request.headers["accessToken"] = token
    }
    await next()
  }
}

'use strict'
module.exports = {
  port: 3000,
  BASE_FILE_HOST: '"http://192.168.2.161:80"', // 文件服务域名, webpack.DefinePlugin变量需要加双层引号，并且命名为全大写
  baseFileHost: 'http://127.0.0.1:3000', // 文件服务
  THEME: '"Default"', // 定制化主题，对应~src/styles/${THEME}
  baseApi: 'http://127.0.0.1:3000' // api server
}

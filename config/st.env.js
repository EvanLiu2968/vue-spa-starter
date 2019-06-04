'use strict'
module.exports = {
  port: 7000,
  BASE_FILE_HOST: '"http://192.168.2.161:80"', // 静态文件nginx服务, webpack.DefinePlugin变量需要加双层引号，并且命名为全大写
  baseFileHost: 'http://127.0.0.1:3000',
  THEME: '"SouthTalent"', // 定制化主题，对应~src/styles/${THEME}/index.scss
  baseApi: 'http://127.0.0.1:3000' // 'https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin'
}

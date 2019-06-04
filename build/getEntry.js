const fs = require('fs')
const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function pathJoin(src){
  return path.join(__dirname, '../', src)
}

const CONFIG = require('./getEnvConfig')

const entries = {}, htmlEntries = [], proxys = {};

const entry = glob.sync(pathJoin('src/pages/**/index.js'));

if(!entry){
  console.error('没有找到入口文件！请检查 src/page/**/index.js')
}

entry.forEach(function(page){
  let entryName = page.match(/pages\/(\w+)\//)[1];
  entries[entryName] = ['babel-polyfill', `./src/pages/${entryName}/index.js`];
  // if(!process.env.NODE_ENV === 'production'){
  //   entries[entryName].unshift('webpack/hot/only-dev-server', 'webpack-dev-server/client?http://localhost:'+ config.webpackPort)
  // }
  let template = pathJoin('src/entry/layout.html');
  if (fs.existsSync(pathJoin(`src/pages/${entryName}/index.html`))) {
    template = pathJoin(`src/pages/${entryName}/index.html`)
  }
  htmlEntries.push(
    new HtmlWebpackPlugin({
      filename: `pages/${entryName}.html`,
      template: template,
      inject: true,
      // hash: true,
      favicon: pathJoin(`static/images/${CONFIG.THEME.replace(/"/g,'')}/favicon.ico`),
      chunksSortMode: 'manual', // 'none' | 'auto' | 'dependency' | 'manual' | {Function}
      chunks: ['vendors', 'commons', entryName],
      env: process.env.NODE_ENV === 'production' ? 'production' : 'development',
      minify: {
        removeComments: true,
        collapseWhitespace: false,
        removeAttributeQuotes: false
      }
    })
  )
  // page routes
  const route = `/${entryName}`
  proxys[route] = {
    target:'http://127.0.0.1:8002',  // 开发环境
    changeOrigin: false,
    pathRewrite: {}
  }
  proxys[route].pathRewrite[`^${route}`] = `/pages/${entryName}.html`
})

module.exports = {
  proxys,
  htmlEntries,
  entries
}

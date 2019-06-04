'use strict'
// Template version: 1.2.6
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const { proxys } = require('../build/getEntry')
function parseCookie(cookie) {
  var pattern = /([^=]+)=([^;]+);?\s*/g;
  var result;
  var map = {};
  while((result = pattern.exec(cookie)) != null) {
    map[result[1]] = result[2];
  }
  return map
}
// 某些get请求无法在浏览器设置headers，在此处进行处理
function setCookie(proxyReq, req, res) {
  // console.log(req.headers)
  // express会自动把headers的key转成全小写或首字母大写
  if (!req.headers['accessToken'] && !req.headers['AccessToken'] && !req.headers['accesstoken']) {
    try {
      const accessToken = parseCookie(req.headers['cookie'])['cas_token']
      if (accessToken) {
        proxyReq.setHeader('accessToken', accessToken)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: Object.assign({}, proxys, {
      '/api': {
        target:'http://127.0.0.1:3000',  // 开发环境
        changeOrigin: true,
        logLevel: 'debug',
        // onError: function(err, req, res) {
        //   res.writeHead(500, {
        //     'Content-Type': 'text/plain'
        //   })
        //   res.end('Something went wrong. And we are reporting a custom error message.')
        // },
        onProxyReq: function(proxyReq, req, res) {
          // add custom header or body to request
          // console.log('proxyReqUrl:' + config.baseApi + req.url)
          // console.log(req.headers)
          setCookie(proxyReq, req, res)
        },
        pathRewrite: {
          '^/api': ''
        }
      },
      '/fileService': {
        target: 'http://127.0.0.1:3000', // nginx文件服务
        changeOrigin: true,
        logLevel: 'debug',
        onProxyReq: function(proxyReq, req, res) {
          setCookie(proxyReq, req, res)
        },
        pathRewrite: {
          '^/fileService': ''
        }
      }
    }),

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8002, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'source-map', // cheap-source-map

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',

    /**
     * You can set by youself according to actual condition
     * You will need to set this if you plan to deploy your site under a sub path,
     * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then assetsPublicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     */
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: 'source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report || false,

    // `npm run build:prod --generate_report`
    generateAnalyzerReport: process.env.npm_config_generate_report || false
  }
}

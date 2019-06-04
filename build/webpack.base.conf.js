'use strict'
const path = require('path')
const webpack = require('webpack')
const utils = require('./utils')
const config = require('../config/webpack')
const { VueLoaderPlugin } = require('vue-loader')
const vueLoaderConfig = require('./vue-loader.conf')
const { htmlEntries, entries } = require('./getEntry')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const CONFIG = require('./getEnvConfig')

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'THEME.scss': resolve(`src/styles/${CONFIG.THEME.replace(/"/g,'')}/index.scss`),
      'THEME_VAR.scss': resolve(`src/styles/${CONFIG.THEME.replace(/"/g,'')}/variables.scss`)
    }
  },
  // optimization: {
    // runtimeChunk: {
    //     name: 'manifest'
    // },
    // minimizer: true, // mode为production是默认true
    // splitChunks: { // cacheGroups为子配置项，其他均为公用配置项,公用配置项均可在子配置项中再次定义
    //   chunks: 'all', // chunks范围, 'initial'只对入口文件处理, "all"对entry进行拆分
    //   minSize: 300000,
      // minChunks: 1,
      // maxAsyncRequests: 5, // 最大异步请求chunks
      // maxInitialRequests: 3, // 最大初始化chunks
      // cacheGroups: {
      //   vendors: {
      //     test: /react|react-dom|axios|lodash/,
      //     name: "vendors", //chunks id
      //     filename: config.env !== 'dev' ? 'js/[name]_[hash:10].js' : 'js/[name].js', //打包输出的name
      //     priority: 10, // 优先级
      //     enforce: true
      //   },
      //   default: false,
      //   commons: {
      //     test: /\.(?!(css|sass|scss|less|styl|stylus))$/, //排除css chunks，先一个页面一个css
      //     name: 'commons',
      //     filename: config.env !== 'dev' ? 'js/[name]_[hash:10].js' : 'js/[name].js',
      //     // minSize: 20000, //默认为 30000(30kb),公用业务代码大于这个尺寸则抽取出来
      //     // minChunks: 1, // 几个入口的公用代码
      //     // priority: 1, // 优先级
      //     reuseExistingChunk: true, //重用已存在chunk
      //     enforce: true
      //   }
      // }
    // }
  // },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('mock'),
          resolve('node_modules/vue-echarts'),
          resolve('node_modules/resize-detector'),
          resolve('node_modules/webpack-dev-server/client')
        ]
      },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     'vue-style-loader',
      //     'css-loader',
      //     {
      //       loader: 'sass-loader',
      //       options: {
      //         // 你也可以从一个文件读取，例如 `variables.scss`
      //         // data: `$color: red;`
      //         resources: [
      //           path.resolve(__dirname, `../src/styles/${CONFIG.THEME}/variables.scss`),
      //           path.resolve(__dirname, '../src/styles/mixin.scss')
      //         ]
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src/icons')],
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|flv|swf|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // new webpack.DefinePlugin({
    //   'THEME': CONFIG.THEME,
    //   'BASE_FILE_HOST': CONFIG.BASE_FILE_HOST
    // })
  ].concat(htmlEntries),
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

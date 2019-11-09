module.exports = {
  presets: [
    ['@vue/app', {
      useBuiltIns: 'entry' // 要么dependencies添加core.js，要么加入babel-polifill.js的cdn
    }]
  ],
  plugins: []
}

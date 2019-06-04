### 工具安装
- Node (v8+，建议先安装v8~LTS，后续升级至v10~LTS)
- Yarn (yarn有缓存依赖包功能，推荐使用，npm为Node自带无需安装)

注：工具包可找前端或自行安装(总共20M)

### 开发服务运行
首次运行需要安装依赖包
```bash
git clone xxx.git
git checkout develop
yarn # 时间会比较长，node-sass因为网络或其他原因可能失败，可再次执行继续安装
```

开发运行
```js
// 修改接口代理配置 ~config/webpack.js 修改target即可
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: Object.assign({}, proxys, {
      '/api': {
        target:'http://127.0.0.1:3000',  // 开发环境
        // target: 'http://192.168.1.216:8083', // xxx
      }
    })
  }
}
```
```bash
# 当有更新时直接git pull会自动更新界面
yarn run dev
```

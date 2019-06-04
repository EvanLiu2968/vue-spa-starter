# 干部档案管理系统

建议
- 环境: node8^ + yarn/npm
- 编辑器：vscode/webstorm

## 开始
```bash
yarn install # npm i
yarn run dev # 默认入口为src/pages/*/index.js
yarn run build # 打包
yarn run server
```
### 环境配置
- `config/dev.env.js` 开发环境
- `config/test.env.js` 测试环境
- `config/uat.env.js` 预生产环境
- `config/prod.env.js` 生产环境

### 其他流程文档
- [环境发布流程.md](./docs/RELEASE.md)
- [本地开发环境运行流程.md](./docs/DEVELOP.md)

## 后续优化
- 加入多进程/DLL编译(HappyPack, webpack-parallel-uglify-plugin...)
- todo

## Eslint
通过`.eslintrc.js`修改
- 0 disable
- 1 warning
- 2 error

### 代码规范
- https://github.com/airbnb/javascript
- `.vue`文件及相关文件夹命名为全小写，以`-`分隔，例如：`button-group`

## 注意点
- 因需要兼容ie9，要求ie9下基本布局不乱，基础功能正常，js部分使用`polyfill`或`transform-runtime`来解决
- flex为ie10+，不能使用flex布局（`el-row``el-col`可使用）

```css
/* 或者参考bootstrap4兼容flex和百分比布局 */
.col {
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
}
.col-1 {
  flex: 0 0 8.333333%;
  max-width: 8.333333%;
}
```
- 小屏幕(<1280或者1360？)可能出现表单、按钮错位，前期以主流屏幕为准
- 通过`~/src/styles/element-theme.scss`定制element-ui主题
- `talebase-ui`覆盖样式统一写在`~/src/styles/talebase-ui.scss`
- 通用样式写在`~/src/styles/${THEME}/app.scss`
- 主要样式变量命名在`~/src/styles/${THEME}/variables.scss`，组件样式通过已定义变量统一主题
- 图标库已放在`https://www.iconfont.cn/` (目前挂在github/evanliu2968账号内)

## Mock数据
考虑后将mockjs移除项目，有点多余，如需模拟数据建议如下：
- 直接在`src/api`或组件里写死数据对象
- 使用`https://easy-mock.com`代理接口
- 在`server/*`里构建本地server代理接口
发布环境使用 `nginx` 或 `nginx + node`反向代理接口

## Docker+pm2部署
- [使用docker和pm2在生产环境中部署nodejs应用](https://www.jianshu.com/p/bb9f88c1c032?utm_campaign)

## Enhance Project

### Chart
- [echarts](https://github.com/ecomfe/vue-echarts)

### 上传
- `components/common/FileUpload` ie10+ FormData上传，ie9 iframe上传

### 加密传输
- `https://blog.csdn.net/baidu_22254181/article/details/82594072`
- 目前采用AES对称加密，`~/src/libs/auth.js`

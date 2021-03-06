# 多单页系统

> 本系统已迁移至vue-cli-service构建，开箱即用

建议
- 环境: >=node8 + yarn
- 编辑器：vscode

## 开始

```bash
yarn # npm i
yarn run dev # 默认入口为src/pages/*/index.js
```

### 环境配置

```bash
.env # 默认配置
.env.local # gitignore，会merge .env
.env.prod
.env.prod.local # gitignore，会merge .env.prod
```

## CommitLint

按照通用规范type
- feat: 新功能（feature）
- fix: 修补bug
- docs: 文档（documentation）
- style: 样式调整
- refactor: 重构某功能
- test: 增加测试
- chore: 构建过程或辅助工具的变动
- perf: 性能优化
- revert: revert commit

```bash
# type: 提交类型  scope: 变动范围  type为必需，scope选填
# git commit -m '${type}(${scope}): some message'
git commit -m 'feat: 增加 xxx 功能'
git commit -m 'fix: 修复 xxx 功能'
git commit -m 'fix(UserController): [bug005]修复用户权限问题'
```

## Eslint
通过`.eslintrc.js`修改
- 0 disable
- 1 warning
- 2 error

### 代码规范
- https://github.com/airbnb/javascript
- `.vue`文件及相关文件夹命名为全小写，以`-`分隔，例如：`button-group`

## 注意点
- js的polyfill已通过html全局引入cdn，不需要再使用`babel-polyfill`或`transform-runtime`来解决
- 通过`~/src/styles/element-theme.scss`定制element-ui主题
- 通用样式写在`~/src/styles/${THEME}/app.scss`
- 主要样式变量命名在`~/src/styles/${THEME}/variables.scss`，组件样式通过已定义变量统一主题
- 图标库已放在`https://www.iconfont.cn/` (目前挂在github/evanliu2968账号内)
- https://serverfault.com/questions/506972/nginx-why-i-cant-put-proxy-set-header-inside-an-if-clause

## Enhance Project

### Chart
- [echarts](https://echarts.baidu.com/examples/)
- `~/src/components/common/vue-echarts`

### 上传
- `components/common/file-upload` ie10+ FormData上传，ie9 iframe上传

### 加密传输
- `https://blog.csdn.net/baidu_22254181/article/details/82594072`
- 目前采用AES对称加密，`~/src/libs/auth.js`

### webapck

- babel默认不转node_modules里的文件，需要在`~vue.config.js/transpileDependencies`声明
- `new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(zh-cn)$/)`去除其他语言包(压缩包300多kb)
- `echarts`单个图表引入太麻烦(源码2M+,压缩包600kb)采用在html中引入js，避免每次打包

### 服务器环境

nginx配置地址: cd /etc/nginx/vhost
修改完需要重启nginx，以docker命令重启
重载配置文件：docker exec nginx nginx -s reload
检查配置文件：docker exec nginx nginx -t

### 其他流程文档
- [环境发布流程.md](./docs/RELEASE.md)
- [本地开发环境运行流程.md](./docs/DEVELOP.md)

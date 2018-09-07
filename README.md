## vue-spa-starter

基于Vue的SPA内容管理系统解决方案

### 说明

基于Vue2.x及Element UI 2.x(DOM框架)，vue-router，vuex，axios的后台管理系统解决方案


### 目录结构介绍

```bash
  |-- build                            # webpack配置文件
    |-- config                         # 项目打包路径
    |-- node_moduel                    # 项目模块依赖
  |-- dist                             # 执行构建命令后生成的dist文件
  |-- src                              # 源码目录
    |   |-- api                        # 模拟api
    |   |-- assets                     # 放置公用自定义css和图标等资源
    |   |-- routes                     # 路由及菜单配置
    |   |-- vuex                       # 状态管理
  |   |-- views                        # vue单文件
  |       |-- common                   # 公共组件
  |           |-- Header.vue           # 公共头部
  |           |-- Home.vue           	 # 公共路由入口
  |           |-- Sidebar.vue          # 公共左边栏
  |		|-- **                   	       # 页面模块
  |   |-- App.vue                      # 页面入口文件
    |   |-- main.js                    # 程序入口文件，加载各种公共组件
  |-- .babelrc                         # ES6语法编译配置
  |-- .gitignore                       # 忽略的文件
  |-- index.html                       # 入口html文件
  |-- package.json                     # 项目及工具的依赖配置文件
  |-- README.md                        # 说明
```

### 开始

```bash
# 安装项目依赖
npm install

# 构建开发环境
npm run dev

# 构建生产环境
npm run build
```

### 浏览器支持

现代浏览器及IE10+

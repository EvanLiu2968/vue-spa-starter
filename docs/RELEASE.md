### 环境配置
- `config/dev.env.js` 本机开发环境
- `config/test.env.js` 开发/测试环境
- `config/ust.env.js` 预生产环境
- `config/prod.env.js` 生产环境

### 测试环境总体流程安装

1. Node安装(见下)

2. 安装全局工具包

```bash
npm i yarn pm2 -g
```
3. git仓库拉取

首次启动项目流程
```bash
# 拉取develop分支后 
# git pull ...
# cd ./spa-web
yarn # 更新包
node build/build.js --env test
pm2 start server/index.js --name spa-web -- --env test # --空格后的参数为node参数，对应环境启动对应环境配置参数(设定服务，首次即可，delete后需要重新设定)
```

更新项目流程(需要更新时)
```bash
pm2 stop spa-web
git pull
yarn
node build/build.js --env test # 根据运行环境执行不同的配置，如--env prod，test对应config/${env}.env.js
pm2 restart spa-web
# pm2主要命令：
pm2 restart spa-web # 重启服务
pm2 stop spa-web # 停止服务
pm2 delete spa-web # 删除服务
pm2 logs spa-web # 查看服务日志
```

或者执行shell脚本（跟上面更新项目流程一样，只是把参数封装至shell）
```bash
sh build.sh
# 等同于下面，默认$1参数为test(环境参数) $2参数为spa-web(pm2设置的服务名)
# sh build.sh test spa-web
```

### Node安装
```bash
wget https://nodejs.org/dist/v8.11.1/node-v8.11.1.tar.gz
tar zxf node-v8.11.1.tar.gz
cd node-v8.11.1
./configure --prefix=/usr/local/node-8.11.1
make && make install # 开始gcc编译(近半小时到一个小时)
# 环境配置
ln -s /usr/local/node-8.11.1/ /usr/local/node
vim /etc/profile
# start 配置全局环境变量
export NODE_HOME=/usr/local/node
export PATH=$PATH:$NODE_HOME/bin
# end
source /etc/profile
node -v # 查看node版本，看到即成功
```
```bash
# 需要将端口设置为外界可访问的公共端口
firewall-cmd --permanent --zone=public --add-port=3000/tcp
firewall-cmd --reload
```
### Nginx安装
```bash
# download nginx package corresponding to the current system version

wget  http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm

# create nginx's yum resposity

rpm -ivh nginx-release-centos-7-0.el7.ngx.noarch.rpm

# download and install nginx

yum install nginx
```

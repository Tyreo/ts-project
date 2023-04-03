# NPM的常用指令

## 更新npm到最新版本

```bash
npm install npm@latest -g 
```

## 查看npm安装了那些插件

```bash
# --depth 表示深度，我们使用的模块会有依赖，深度为零的时候，不会显示依赖模块
$ npm list --depth=0 #查看局部
$ npm list --depth=0 -g #查看全局
```

#### 修改npm镜像

> npm 提供的公共平台是在国外的服务器上，我们在国内使用npm下载包都需要到国外网站上去下载，有时下载速度是很慢很慢的。淘宝镜像是阿里的淘宝团队出的一个平台，相npm 当于把国外 npm 上的包全部 copy 一份到淘宝镜像这个国内服务器上，不用担心 npm 上的包与淘宝镜像上的包有差异，完全一模一样

```ruby
$ npm get registry #查看原本镜像
$ npm config set registry http://registry.npm.taobao.org/ #修改成淘宝镜像
$ npm config set registry https://registry.npmjs.org/ #镜像还原
```

#### 常用命令

##### 缩写

```bash
install -> i
uninstall -> un
--save-dev -> -D
--save -> -S
```

#### 项目初始化

```bash
$ npm init #初始化项目，创建 package.json
```

#### 项目安装依赖

```bash
$ npm install
```

#### 全局操作

```bash
$ npm install -g 模块 #全局安装模块
$ npm uninstall -g 模块 #全局删除模块
```

#### 当前目录模块操作 

```bash
$ npm install 模块 #安装模块，安装好后不写入package.json中
$ npm install 模块 --save #安装好后写入package.json的dependencies中（生产环境依赖）
$ npm install 模块 --save-dev 安装好后写入package.json的devDepencies中（开发环境依赖）
$ npm uninstall 模块 #删除模块，但不删除模块留在package.json中的对应信息
$ npm uninstall 模块 --save #删除模块，同时删除模块留在package.json中dependencies下的对应信息
$ npm uninstall 模块 --save-dev #删除模块，同时删除模块留在package.json中devDependencies下的对应信息
```

## **利用npm 发布包**

发布包之前你首先要有一个npm的账号

### **第一次发布包：**

在终端输入npm adduser，提示输入账号，密码和邮箱，然后将提示创建成功

### **非第一次发布包：**

在终端输入npm login，然后输入你创建的账号和密码，和邮箱，登陆

【注意】npm adduser成功的时候默认你已经登陆了，所以不需要再接着npm login.

## 撤回包

npm unpublish 包名 --force


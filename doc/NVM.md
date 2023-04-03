# node 版本管理

## 什么是 nvm

nvm 全名 node.js version management，顾名思义是一个 nodejs 的版本管理工具。通过它可以安装和切换不同版本的 nodejs。

## Mac 安装

参考文档：https://github.com/nvm-sh/nvm#install--update-script

### 命令行安装

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash`

or

`wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash`

### 问题处理

1.若出现这个错误：Failed to connect to raw.githubusercontent.com port 443: Connection refused error

原因：由于域名被污染导致链接不到服务器，我们只需将下面的解析放到 /etc/hosts 文件夹下即可，然后执行第一步命令即可安装成功。

`185.199.108.133 raw.githubusercontent.com. `

## 环境变量配置

根据终端类型，在不同文件中添加一下内容:

```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

添加后，执行刷新配置文件命令

_bash_: `source ~/.bashrc`

_zsh_: `source ~/.zshrc`

_ksh_: `. ~/.profile`

## nvm 的常用指令

- `nvm install stable` ## 安装最新稳定版 node，当前是 node v10.15.0 (npm v6.4.1)
- `nvm install <version>` ## 安装指定版本，可模糊安装，如：安装 v4.4.0，既可 nvm install v4.4.0，又可 nvm install 4.4
- `nvm uninstall <version>` ## 删除已安装的指定版本，语法与 install 类似
- `nvm use <version>` ## 切换使用指定的版本 node
- `nvm ls` ## 列出所有安装的版本
- `nvm ls-remote` ## 列出所有远程服务器的版本（官方 node version list）
- nvm --version 显示当前安装的 nvm 版本
- `nvm alias <name> <version>` ## 给不同的版本号添加别名
- `nvm unalias <name>` ## 删除已定义的别名
- `nvm reinstall-packages <version>` ## 在当前版本 node 环境下，重新全局安装指定版本号的 npm 包

修改 nvm 默认使用的 node 版本：

`nvm alias default <version>`

# 自动切换

之前一直使用 nvm 来对 node 进行多版本管理，为了轻量化，就不引入其它自动切换 node 的版本库了。由于 nvm 对 Windows 支持不是很完善，建议 Windows 用户使用 nvs 进行版本管理。假设已经安装成功 nvm（没安装的可以根据官方文档安装），我们需要在～/.zshrc 文件中加入以下配置：

# place this after nvm initialization!

autoload -U add-zsh-hook
load-nvmrc() {
local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

if [ -n "$nvmrc_path" ]; then
local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi

elif [ "$node_version" != "$(nvm version default)" ]; then
echo "Reverting to nvm default version"
nvm use default
fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
如果你的终端是 bash 或者其它的话，请自行查看官方示例。上面的代码是当你在项目下打开终端时，nvm 会在当前项目下去找 .nvmrc 文件，因此我们需要在项目根目录增加此文件，写入自己想要执行的版本号，如：

13.14.0
倘若你还没安装此版本的 node，nvm 则会自动去安装对应版本的 node 并且自动设为该版本。在项目中打开终端，nvm 就会自动切换到对应的 node 版本啦。

[TOC]

# 目的

1. 了解 Nginx 是什么；
2. 学习 Nginx 的安装及简单使用；
3. 单页面应用部署；
4. 反向代理的简单应用；
5. 简单使用负载均衡；
6. 跨域处理的配置方法；
7. 缓存配置方法；

# Nginx 简介
Nginx (engine x) 是一个高性能的HTTP和反向代理web服务器，同时也提供了IMAP/POP3/SMTP服务。Nginx是由伊戈尔·赛索耶夫为俄罗斯访问量第二的Rambler.ru站点（俄文：Рамблер）开发的，第一个公开版本0.1.0发布于2004年10月4日。

它高并发性能很好，官方测试能够支撑 5 万的并发量；运行时内存和 CPU 占用率低，配置简单，容易上手，而且运行非常稳定。

官方网站：http://nginx.org/ 

# Nginx 的常用功能
Nginx 的功能特别多，这里只介绍几个常用的功能，具体参考官网介绍。

## 1. 反向代理；
这是 Nginx 服务器作为 WEB 服务器的主要功能之一，客户端向服务器发送请求时，会首先经过 Nginx 服务器，由服务器将请求分发到相应的 WEB 服务器。正向代理是代理客户端，而反向代理则是代理服务器，Nginx 在提供反向代理服务方面，通过使用正则表达式进行相关配置，采取不同的转发策略，配置相当灵活，而且在配置后端转发请求时，完全不用关心网络环境如何，可以指定任意的IP地址和端口号，或其他类型- 请求等。
## 2. 负载均衡；
这也是 Nginx 最常用的功能之一，负载均衡，一方面是将单一的重负载分担到多个网络节点上做并行处理，每个节点处理结束后将结果汇总返回给用户，这样可以大幅度提高网络系统的处理能力；另一方面将大量的前端并发请求或数据流量分担到多个后端网络节点分别处理，这样可以有效减少前端用户等待相应的时间。而 Nginx 负载均衡都是属于后一方面，主要是对大量前端访问或流量进行分流，已保证前端用户访问效率，并可以减少后端服务器处理压力。
## 3. Web 缓存；
在很多优秀的网站中，Nginx 可以作为前置缓存服务器，它被用于缓存前端请求，从而提高 Web服务器的性能。Nginx 会对用户已经访问过的内容在服务器本地建立副本，这样在一段时间内再次访问该数据，就不需要通过 Nginx 服务器向后端发出请求。减轻网络拥堵，减小数据传输延时，提高用户访问速度。

# Nginx 安装
关于 Nginx 的安装，官方分为在 Windows 平台和 Linux 平台安装，Windows 版本的 Nginx 服务器在效率上要比 Linux 版本的 Nginx 服务器差一些，而且实际使用的一般都是 Linux 平台的 Nginx 服务器。Mac 系统需要使用其他方式安装，由于我们团队都是 Mac 电脑，后期我们介绍时会以 Mac 版本的为主。

## 官方安装
![](https://note.youdao.com/yws/public/resource/dcb52993f65e8f807fb9412315cc8e22/xmlnote/B7CEA40E78084315B7E1E3C6BDDF9685/20194)

## Mac 版本安装
### 1. 安装 brew
参考官网：https://brew.sh/index_zh-cn

### 2. 使用命令安装 Nginx
```shell
// 搜索
brew search nginx
// 安装
brew install nginx
// 查看版本，以及配置文件地址
nginx -V
// 查看版本
nginx -v
// 重新加载配置|重启|停止|退出 Nginx
nginx -s reload|reopen|stop|quit
// 测试配置是否有语法错误
nginx -t
```

### 3. 启动 Nginx 服务器
```shell
sudo nginx
````
在浏览器中输入 http://localhost:80 出现如下界面即启动成功。
![](https://note.youdao.com/yws/public/resource/dcb52993f65e8f807fb9412315cc8e22/xmlnote/2E3B5B422712472F9F50F1E80BA7CF04/20202)

### 4. 关闭 Nginx

- 快速停止，此方式相当于先查出 nginx 进程 id 再使用 kill 命令强制杀掉进程，不太友好。

```shell
nginx -s stop
```
- 平缓停止，此方式允许 nginx 服务将当前正在处理的网络请求处理完成，但不在接收新的请求，之后关闭连接，停止工作。
```shell
nginx -s quit
```

### 5. 重启 nginx

- 先停止再启动，相当于先执行停止命令再执行启动命令。
```shell
nginx -s quit
nginx
```
- 重新加载配置文件，通常我们使用 nginx 修改最多的便是其配置文件 nginx.conf。修改之后想要让配置文件生效而不用重启 nginx，便可以使用此命令。
```shell
nginx -s reload
```
### 6. 检测配置文件语法是否正确

方式1：通过如下命令，指定需要检查的配置文件
```shell
nginx -t -c  /usr/local/etc/nginx/nginx.conf
```
方式2：通过如下命令，不加 -c 参数，默认检测 nginx.conf 配置文件。
```shell
nginx -t 
nginx: the configuration file /usr/local/etc/nginx/nginx.conf syntax is ok
nginx: configuration file /usr/local/etc/nginx/nginx.conf test is successful
```

## Q&A 🙋🙋‍♂️
1. Nginx 重新加载配置|重启|停止|退出 命令分别是什么
```shell

```
2. 检测配置文件语法是否正确
```shell

```



# nginx.conf 配置文件
1. Nginx 主配置文件 /usr/local/etc/nginx/nginx.conf
2. Nginx 子配置文件目录 /usr/local/etc/nginx/conf.d

## 修改 Nginx 默认端口号
1. 使用 vi/vim 进入 /usr/local/etc/nginx/nginx.conf
nginx.conf 的主体结构
```shell
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    include /usr/local/etc/nginx/conf.d/*.conf;

    server {
        listen       9999;
        server_name  localhost;

         location / {
            root   html;
            index  index.html index.htm;
        }
	
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
        
    }

    include servers/*;
}
```
2. 修改 listen 为 9999，然后执行以下命令
```shell
// 检查配置文件语法
nginx -t
// 重新加载配置文件
nginx -s reload
```
在浏览器中输入 http://localhost:9999 出现如下界面即启动成功。
![](https://note.youdao.com/yws/public/resource/dcb52993f65e8f807fb9412315cc8e22/xmlnote/72C9B2B0830E448EABE784EFB65278BF/20198)


## nginx.conf 的主体结构说明
根据上述文件，我们可以很明显的将 nginx.conf 配置文件分为三部分

### 全局块
从配置文件开始到 events 块之间的内容，主要会设置一些影响 Nginx 服务器整体运行的配置指令，主要包括配置运行 Nginx 服务器的用户- 允许生成的 worker process 数，进程 PID 存- 日志存放路径和类型以及配置文件的引入等。
比如上面第一行配置：
```shell
worker_processes  1;
```
这是 Nginx 服务器并发处理服务的关键配置，worker_processes 值越大，可以支持的并发处理量也越多，但是会受- 软件等设备的制约，这个后面会详细介绍。

### events 块
比如上面的配置：
```shell
worker_connections  1024;
```
events 块涉及的指令主要影响 Nginx 服务器与用户的网络连接，常用的设置包括是否开启对多 work process 下的网络连接进行序列化，是否允许同时接收多个网络连接，选取哪种事件驱动模型来处理连接请求，每个 word process 可以同时支持的最大连接数等。

上述例子就表示每个 work process 支持的最大连接数为 1024.

这部分的配置对 Nginx 的性能影响较大，在实际中应该灵活配置。

### http 块
```shell
http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    include /usr/local/etc/nginx/conf.d/*.conf;

    server {
        listen       9999;
        server_name  localhost;

         location / {
            root   html;
            index  index.html index.htm;
        }
	
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
        
    }

    include servers/*;
}
```
这部分是 Nginx 服务器配置中最频繁的部分- 缓存和日志定义等绝大多数功能和第三方模块的配置都在这里。

- http 块也可以包括 http- server 块
  - http 全局块
  http全局块配置的指令包括文- MIME-TYPE- 日志- 连接超- 单链接请求数上限等。
  - server 块
  这块和虚拟主机有密切关系，虚拟主机从用户角度看，和一台独立的硬件主机是完全一样的，该技术的产生是为了节省互联网服务器硬件成本。后面会详细介绍虚拟主机的概念。
  每个 http 块可以包括多个 server 块，而每个 server 块就相当于一个虚拟主机。
  而每个 server 块也分为全局 server 块，以及可以同时包含多个 locaton 块。
  1. 全局 server 块
  最常见的配置是本虚拟机主机的监听配置和本虚拟主机的名称或IP配置。
  2. location 块
  一个 server 块可以配置多个 location 块。
  这块的主要作用是基于 Nginx  服务器接收到的请求字符串（例如 server_name/uri-string），对虚拟主机名称（也可以是IP别名）之外的字符串（例如 前面的 /uri-string）进行匹配，对特定的请求进行处理。地- 数据缓存和应答控制等功能，还有许多第三方模块的配置也在这里进行。


## Q&A 🙋🙋‍♂️
1. 下面模块表示什么意义？
```shell
// ？？？
worker_processes  1; 
// ？？？
worker_connections  1024;
```

# Nginx 反向代理
Nginx 服务器的反向代理服务是其最常用的重要功能，由反向代理服务也可以衍生出很多与此相关的 Nginx 服务器重要功能，比如后面会介绍的负载均衡。

## 代理
在设计模式中，代理模式是这样定义的：给某个对象提供一个代理对象，并由代理对象控制原对象的引用。

代理简单来说，就是如果我们想做什么，但又不想直接去做，那么这时候就找另外一个人帮我们去做。那么这个例子里面的中介公司就是给我们做代理服务的，我们委托中介公司帮我们找房子。

Nginx 主要能够代理如下几种协议，其中用到的最多的就是做Http代理服务器。

![](https://note.youdao.com/yws/public/resource/dcb52993f65e8f807fb9412315cc8e22/xmlnote/EC6CEAE847C546A6A0003600EA764693/20207)

## 正向代理
弄清楚什么是代理了，那么什么又是正向代理呢？

这里我再举一个例子：大家都知道，现在国内是访问不了 Google的，那么怎么才能访问 Google呢？我们又想，美国人不是能访问 Google吗（这不废话，Google就是美国的），如果我们电脑的对外公网 IP 地址能变成美国的 IP 地址，那不就可以访问 Google了。你很聪明，VPN 就是这样产生的。我们在访问 Google 时，先连上 VPN 服务器将我们的 IP 地址变成美国的 IP 地址，然后就可以顺利的访问了。

这里的 VPN 就是做正向代理的。正向代理服务器位于客户端和服务器之间，为了向服务器获取数据，客户端要向代理服务器发送一个请求，并指定目标服务器，代理服务器将目标服务器返回的数据转交给客户端。这里客户端是要进行一些正向代理的设置的。

PS：这里介绍一下什么是 VPN，VPN 通俗的讲就是一种中转服务，当我们电脑接入 VPN 后，我们对外 IP 地址就会变成 VPN 服务器的 公网 IP，我们请求或接受任何数据都会通过这个VPN 服务器然后传入到我们本机。这样做有什么好处呢？比如 VPN 游戏加速方面的原理，我们要玩网通区的 LOL，但是本机接入的是电信的宽带，玩网通区的会比较卡，这时候就利用 VPN 将电信网络变为网通网络，然后在玩网通区的LOL就不会卡了（注意：VPN 是不能增加带宽的，不要以为不卡了是因为网速提升了）。

可能听到这里大家还是很抽象，没关系，和下面的反向代理对比理解就简单了。

## 反向代理
反向代理和正向代理的区别就是：正向代理代理客户端，反向代理代理服务器。

反向代理，其实客户端对代理是无感知的，因为客户端不需要任何配置就可以访问，我们只需要将请求发送到反向代理服务器，由反向代理服务器去选择目标服务器获取数据后，在返回给客户端，此时反向代理服务器和目标服务器对外就是一个服务器，暴露的是代理服务器地址，隐藏了真实服务器IP地址。

下面我们通过两张图来对比正向代理和方向代理：
![](https://note.youdao.com/yws/public/resource/dcb52993f65e8f807fb9412315cc8e22/xmlnote/BA57239818B74ECABA81CC42F76B0C97/20209)
![](https://note.youdao.com/yws/public/resource/dcb52993f65e8f807fb9412315cc8e22/xmlnote/0F4776C482C34F7DA12A28C6F095CDAC/20211)

理解这两种代理的关键在于代理服务器所代理的对象是什么，正向代理代理的是客户端，我们需要在客户端进行一些代理的设置。而反向代理代理的是服务器，作为客户端的我们是无法感知到服务器的真实存在的。

总结起来还是一句话：正向代理代理客户端，反向代理代理服务器。

## Nginx 反向代理
示例：使用 Nginx 反向代理 http://dev.lvyuetravel.com/ 直接跳转到 http://127.0.0.1:9996/pluckyDraw/
本机的 Nginx demo： http://127.0.0.1:9996/pluckyDraw/

1. 浏览器输入  http://127.0.0.1:9996/pluckyDraw/ ，出现如下抽奖页面
![](https://note.youdao.com/yws/public/resource/dcb52993f65e8f807fb9412315cc8e22/xmlnote/2BF1EBE5A7DE4C2EBAE2A7133120F11E/20213)

2. 配置 host 文件，将 dev.lvyuetravel.com 映射到 127.0.0.1
```shell
127.0.0.1 dev.lvyuetravel.com 
```
配置完成之后，我们便可以通过 dev.lvyuetravel.com:9996 访问到第一步出现的抽奖页面；

那么如何只需要输入 dev.lvyuetravel.com 便可以跳转到抽奖页面？便用到 Nginx 的反向代理。

3. 修改 nginx.conf 配置文件，添加如下配置
```shell
server {
  listen       80;
  server_name  dev.lvyuetravel.com;

  location / {
      proxy_pass http://127.0.0.1:9996/pluckyDraw/;
  }
}
```
如上配置，我们监听 80 端口，访问域名为 dev.lvyuetravel.com，不加端口号时默认为 80 端口，故访问该域名时会跳转到 127.0.0.1:9996/pluckyDraw/ 的路径上。

浏览器输入 http://dev.lvyuetravel.com/ ，如果如下：
![](https://note.youdao.com/yws/public/resource/dcb52993f65e8f807fb9412315cc8e22/xmlnote/3ABF15ACC5FB44CDAD8696ECB0B9DE91/20215)

## Nginx 反向代理相关指令介绍

### listen
该指令用于配置网络监听。主要有如下三种配置语法结构：
1. 配置监听的IP地址
```shell
listen address[:port] [default_server] [setfib=number] [backlog=number] [rcvbuf=size] [sndbuf=size] [deferred]
    [accept_filter=filter] [bind] [ssl];
```

2. 配置监听端口
```shell
listen port[default_server] [setfib=number] [backlog=number] [rcvbuf=size] [sndbuf=size] [accept_filter=filter] 
    [deferred] [bind] [ipv6only=on|off] [ssl];
```

3. 配置 UNIX Domain Socket
```shell
listen unix:path [default_server]  [backlog=number] [rcvbuf=size] [sndbuf=size] [accept_filter=filter] 
    [deferred] [bind] [ssl];
```

4. 总结：上面的配置看似比较复杂，其实使用起来是比较简单的
```shell
listen *:80 | *:8080      #监听所有80端口和8080端口
listen  IP_address:port   #监听指定的地址和端口号
listen  IP_address        #监听指定ip地址所有端口
listen port               #监听该端口的所有IP连接
```
下面分别解释每个选项的具体含义：
- address:IP地址，如果是 IPV6地址，需要使用中括号[] 括起来，比如[fe80::1]等。
- port:端口号，如果只定义了IP地址，没有定义端口号，那么就使用80端口。
- path:socket文件路径，如 var/run/nginx.sock等。
- default_server:标识符，将此虚拟主机设置为 address:port 的默认主机。（在 nginx-0.8.21 之前使用的是 default 指令）
-  setfib=number:Nginx-0.8.44 中使用这个变量监听 socket 关联路由表，目前只对 FreeBSD 起作用，不常用。
- backlog=number:设置监听函数listen()最多允许多少网络连接同时处于挂起状态，在 FreeBSD 中默认为 -1,其他平台默认为511.
- rcvbuf=size:设置监听socket接收缓存区大小。
- sndbuf=size:设置监听socket发送缓存区大小。
- deferred:标识符，将accept()设置为Deferred模式。
- accept_filter=filter:设置监听端口对所有请求进行过滤，被过滤的内容不能被接收和处理，本指令只在 FreeBSD 和 NetBSD 5.0+ 平台下有效。filter 可以设置为 dataready 或 httpready 。
- bind:标识符，使用独立的bind() 处理此address:port，一般情况下，对于端口相同而IP地址不同的多个连接，Nginx 服务器将只使用一个监听指令，并使用 bind() 处理端口相同的所有连接。
- ssl:标识符，设置会话连接使用 SSL模式进行，此标识符和Nginx服务器提供的 HTTPS 服务有关。

### server_name
该指令用于虚拟主机的配置。通常分为以下两种：

1. 基于名称的虚拟主机配置，语法如下：
```shell
server_name   name ...;
```

- 对于name 来说，可以只有一个名称，也可以有多个名称，中间用空格隔开。而每个名字由两段或者三段组成，每段之间用“.”隔开。 
```shell
server_name 123.com www.123.com
```
- 可以使用通配符“*”，但通配符只能用在由三段字符组成的首段或者尾端，或者由两端字符组成的尾端。
```shell
server_name *.123.com www.123.*
```
- 还可以使用正则表达式，用“~”作为正则表达式字符串的开始标记。
```shell
server_name ~^www\d+\.123\.com$;
```
该表达式“~”表示匹配正则表达式，以www开头（“^”表示开头），紧跟着一个0~9之间的数字，在紧跟“.123.co”，最后跟着“m”($表示结尾)

以上匹配的顺序优先级如下：
- 准确匹配 server_name
- 通配符在开始时匹配 server_name 成功
- 通配符在结尾时匹配 server_name 成功
- 正则表达式匹配 server_name 成功

2. 基于 IP 地址的虚拟主机配置
语法结构和基于域名匹配一样，而且不需要考虑通配符和正则表达式的问题。
```shell
server_name 192.168.1.1
```

### location
该指令用于匹配 URL，语法如下：
```shell
location [ = | ~ | ~* | ^~] uri {
 
}
```
- = ：用于不含正则表达式的 uri 前，要求请求字符串与 uri 严格匹配，如果匹配成功，就停止继续向下搜索并立即处理该请求。
- ~：用于表示 uri 包含正则表达式，并且区分大小写。
- ~*：用于表示 uri 包含正则表达式，并且不区分大小写。
- ^~：用于不含正则表达式的 uri 前，要求 Nginx 服务器找到标识 uri 和请求字符串匹配度最高的 location 后，立即使用此 location 处理请求，而不再使用 location 块中的正则 uri 和请求字符串做匹配。

注意：如果 uri 包含正则表达式，则必须要有 ~ 或者 ~* 标识。

### proxy_pass
该指令用于设置被代理服务器的地址。可以是主机名称、IP地址加端口号的形式。语法如下：
```shell
proxy_pass URL;
```

URL 为被代理服务器的地址，可以包含传输协议、主机名称或IP地址加端口号，URI等。
```shell
proxy_pass http://127.0.0.1:9996/pluckyDraw/;
```

### index
该指令用于设置网站的默认首页。语法为：
```shell
index  filename ...;
```

后面的文件名称可以有多个，中间用空格隔开。
```shell
index  index.html index.php;
```
通常该指令有两个作用：
- 用户在请求访问网站时，请求地址可以不写首页名称；
- 可以对一个请求，根据请求内容而设置不同的首页。

## Q&A 🙋🙋‍♂️
1. location 匹配 /api/authorize.json 到 http://test_ows_api
```shell

```
2. location 匹配 /api 开着的接口全部转到 http://test_ows_api
```shell

```

# Nginx 负载均衡
了解 Nginx 的反向代理之后，我们要通过Nginx的反向代理实现另一个重要功能 —— 负载均衡。

## 负载均衡的由来
　　早期的系统架构，基本上都是如下形式的：
![](https://note.youdao.com/yws/public/resource/dcb52993f65e8f807fb9412315cc8e22/xmlnote/C6346E465ACE459FA1C135E8E0F1F7D0/20219)

　　客户端发送多个请求到服务器，服务器处理请求，有一些可能要与数据库进行交互，服务器处理完毕后，再将结果返回给客户端。

　　这种架构模式对于早期的系统相对单一，并发请求相对较少的情况下是比较适合的，成本也低。但是随着信息数量的不断增长，访问量和数据量的飞速增长，以及系统业务的复杂度增加，这种架构会造成服务器相应客户端的请求日益缓慢，并发量特别大的时候，还容易造成服务器直接崩溃。很明显这是由于服务器性能的瓶颈造成的问题，那么如何解决这种情况呢？

　　我们首先想到的可能是升级服务器的配置，比如提高CPU执行频率，加大内存等提高机器的物理性能来解决此问题，但是我们知道摩尔定律的日益失效，硬件的性能提升已经不能满足日益提升的需求了。最明显的一个例子，天猫双十一当天，某个热销商品的瞬时访问量是极其庞大的，那么类似上面的系统架构，将机器都增加到现有的顶级物理配置，都是不能够满足需求的。那么怎么办呢？

　　上面的分析我们去掉了增加服务器物理配置来解决问题的办法，也就是说纵向解决问题的办法行不通了，那么横向增加服务器的数量呢？这时候集群的概念产生了，单个服务器解决不了，我们增加服务器的数量，然后将请求分发到各个服务器上，将原先请求集中到单个服务器上的情况改为将请求分发到多个服务器上，将负载分发到不同的服务器，也就是我们所说的负载均衡。
![](https://note.youdao.com/yws/public/resource/dcb52993f65e8f807fb9412315cc8e22/xmlnote/F67DCFFAF96842C7BD206CEAFE4A75E8/20228)

　　如上，负载均衡完美的解决了单个服务器硬件性能瓶颈的问题。
　　但是随之而来的如何实现负载均衡呢？客户端怎么知道要将请求发送到那个服务器去处理呢？

## Nginx 实现负载均衡
　　Nginx 服务器是介于客户端和服务器之间的中介，通过反向代理的功能，客户端发送的请求先经过 Nginx ，然后通过 Nginx 将请求根据相应的规则分发到相应的服务器。
![](https://note.youdao.com/yws/public/resource/dcb52993f65e8f807fb9412315cc8e22/xmlnote/D7098F8D17D94F28AE167026B14D15E5/20222)

　　主要配置指令为上一讲的 pass_proxy 指令以及 upstream 指令。负载均衡主要通过专门的硬件设备或者软件算法实现。通过硬件设备实现的负载均衡效果好、效率高、性能稳定，但是成本较高。而通过软件实现的负载均衡主要依赖于均衡算法的选择和程序的健壮性。均衡算法又主要分为两大类：

　　静态负载均衡算法：主要包括轮询算法、基于比率的加权轮询算法或者基于优先级的加权轮询算法。

　　动态负载均衡算法：主要包括基于任务量的最少连接优化算法、基于性能的最快响应优先算法、预测算法及动态性能分配算法等。

　　静态负载均衡算法在一般网络环境下也能表现的比较好，动态负载均衡算法更加适用于复杂的网络环境。

### 普通轮询算法
这是Nginx 默认的轮询算法。
原理：两台相同的服务器，通过 localhost:8080 访问服务器1，通过 localhost:8081 访问服务器2，现在我们要输入 localhost 这个地址，可以在这两个服务器之间进行交替访问。
示例：使用 Nginx 反向代理 http://localhost:9990/ 在 http://localhost:9999 和 http://localhost:80 之间交替访问；

1. 修改 nginx.conf
```shell
upstream firstBalance {
  server 127.0.0.1:80;
  server 127.0.0.1:9999;
}

server {
  listen       9990;
  server_name  localhost;

  location / {
      proxy_pass http://firstBalance/;
  }
}
```
2. 重新加载 Nginx 后，在浏览器输入 http://localhost:9990/ 观看页面变化
http://localhost:80
![](https://note.youdao.com/yws/public/resource/dcb52993f65e8f807fb9412315cc8e22/xmlnote/06553591931648B7B3D8439922DED6C9/20224)

http://localhost:9999
![](https://note.youdao.com/yws/public/resource/dcb52993f65e8f807fb9412315cc8e22/xmlnote/2EDABEEE789147E6B9367D565CB06884/20226)

### 基于比例加权轮询
上述两台服务器基本上是交替进行访问的，但是这里我们有个需求：

由于服务器1 的配置更高点，我们希望该服务器接受更多的请求，而服务器2 配置低，希望其处理相对较少的请求。

那么这时候就用到了加权轮-询机制了。

nginx.conf 配置文件如下：
```shell
upstream firstBalance {
  server 127.0.0.1:80 weight=2;
  server 127.0.0.1:9999 weight=8;
}

server {
  listen       9990;
  server_name  localhost;

  location / {
      proxy_pass http://firstBalance/;
  }
}
```
其实对比上面不加权的轮询方式，这里在 upstream 指令中多了一个 weight 指令。
该指令用于配置前面请求处理的权重，默认值为 1。
也就是说：第一种不加权的普通轮询，其实其加权值 weight 都为 1。

调整后明显 9999 端口号出现的次数更多，试验的次数越多越接近我们配置的比例。

### 基于IP路由负载
　　我们知道一个请求在经过一个服务器处理时，服务器会保存相关的会话信息，比如session，但是该请求如果第一个服务器没处理完，通过nginx轮询到第二个服务器上，那么这个服务器是没有会话信息的。

　　最典型的一个例子：用户第一次进入一个系统是需要进行登录身份验证的，首先将请求跳转到Tomcat1服务器进行处理，登录信息是保存在Tomcat1 上的，这时候需要进行别的操作，那么可能会将请求轮询到第二个Tomcat2上，那么由于Tomcat2 没有保存会话信息，会以为该用户没有登录，然后继续登录一次，如果有多个服务器，每次第一次访问都要进行登录，这显然是很影响用户体验的。

　　这里产生的一个问题也就是集群环境下的 session 共享，如何解决这个问题？

　　通常由两种方法：

　　1. 第一种方法是选择一个中间件，将登录信息保存在一个中间件上，这个中间件可以为 Redis 这样的数据库。那么第一次登录，我们将session 信息保存在 Redis 中，跳转到第二个服务器时，我们可以先去Redis上查询是否有登录信息，如果有，就能直接进行登录之后的操作了，而不用进行重复登录。

　　2. 第二种方法是根据客户端的IP地址划分，每次都将同一个 IP 地址发送的请求都分发到同一个服务器，那么也不会存在 session 共享的问题。

　　而 Nginx 的基于 IP 路由负载的机制就是上诉第二种形式。大概配置如下：
```shell
upstream firstBalance {
  ip_hash;
  server 127.0.0.1:80 weight=2;
  server 127.0.0.1:9999 weight=8;
}

server {
  listen       9990;
  server_name  localhost;

  location / {
      proxy_pass http://firstBalance/;
  }
}
```
注意：我们在 upstream 指令块中增加了 ip_hash 指令。该指令就是告诉 Nginx 服务器，同一个 IP 地址客户端发送的请求都将分发到同一个服务器进行处理。

### 基于服务器响应时间负载分配
根据服务器处理请求的时间来进行负载，处理请求越快，也就是响应时间越短的优先分配。

```shell
upstream firstBalance {
  server 127.0.0.1:80 weight=2;
  server 127.0.0.1:9999 weight=8;
  fair;
}

server {
  listen       9990;
  server_name  localhost;

  location / {
      proxy_pass http://firstBalance/;
  }
}
```
通过增加了 fair 指令。

### 对不同域名实现负载均衡
通过配合location 指令块我们还可以实现对不同域名实现负载均衡。
```shell
upstream wordbackend {
  server 127.0.0.1:8080;
  server 127.0.0.1:8081;
}


upstream pptbackend {
  server 127.0.0.1:8082;
  server 127.0.0.1:8083;
}

server {
  listen       80;
  server_name  localhost;

  location /word/ {
    proxy_pass http://wordbackend;
    index  index.html index.htm index.jsp;
  }

  location /ppt/ {
    proxy_pass http://pptbackend;
    index  index.html index.htm index.jsp;
  }
}
```
## Q&A 🙋🙋‍♂️
1. Nginx 负载均衡的原理是什么？
```shell

```
2. Nginx 负载均衡均衡算法有哪些？并简单说明算法效果；
```shell

```

# 跨域配置
1. Access-Control-Allow-Origin，这里使用变量 $http_origin 取得当前来源域，大家说用“*”代表允许所有，实际使用并不成功，原因未知；

2. Access-Control-Allow-Credentials，为 true 的时候指请求时可带上 Cookie，按实际情况配置；

3. Access-Control-Allow-Methods，OPTIONS一定要有的，另外一般也就 GET 和 POST，如有其它的也可加入；

4. Access-Control-Allow-Headers，这个需注意，里面一定要包含自定义的 http 头字段（就是说前端请求接口时，如果在 http 头里加了自定义的字段，这里配置一定要写上相应的字段）

5. Access-Control-Expose-Headers，可不设置，大致意思是默认只能获返回头的6个基本字段，要获取其它额外的，先在这设置才能获取它；

6. 语句“ if ($request_method = 'OPTIONS') { ”，因为浏览器判断是否允许跨域时会先往后端发一个 options 请求，然后根据返回的结果判断是否允许跨域请求，所以这里单独判断这个请求，然后直接返回；

配置如下：
```shell
server {
	listen       80;
	server_name  dev.lvyuetravel.com;
 
	location /system/api {
		add_header 'Access-Control-Allow-Origin' $http_origin;
		add_header 'Access-Control-Allow-Credentials' 'true';
		add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
		add_header 'Access-Control-Allow-Headers' 'DNT,web-token,app-token,Authorization,Accept,Origin,Keep-Alive,User-Agent,X-Mx-ReqToken,X-Data-Type,X-Auth-Token,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
		add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
		if ($request_method = 'OPTIONS') {
			add_header 'Access-Control-Max-Age' 1728000;
			add_header 'Content-Type' 'text/plain; charset=utf-8';
			add_header 'Content-Length' 0;
			return 204;
		}
		root   html;
		index  index.html index.htm;
		proxy_pass http://127.0.0.1:7071;
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
		proxy_connect_timeout 5;
	}
 
	location / {
		root   /var/www/xxx/wechat/webroot;
		index  index.html index.htm;
	}
 
	error_page   500 502 503 504  /50x.html;
	location = /50x.html {
		root   html;
	}
}
```

# Nginx 缓存配置
Nginx 配置缓存的优点：可以在一定程度上，减少服务器的处理请求压力。比如对一些图片，css或js做一些缓存，那么在每次刷新浏览器的时候，就不会重新请求了，而是从缓存里面读取。这样就可以减轻服务器的压力。

## Nginx 可配置的缓存
1. 客户端的缓存(一般指浏览器的缓存)。
2. 服务端的缓存(使用proxy-cache实现的)。

## 客户端的缓存一般有如下两种方式
1. 协商缓存。
2. 强缓存。

```shell
server {
  location ~* \.(html)$ {
    add_header  Cache-Control  max-age=no-cache;
  }

  location ~* \.(css|js|png|jpg|jpeg|gif|gz|svg|mp4|ogg|ogv|webm|htc|xml|woff)$ {
    # 同上，通配所有以.css/.js/...结尾的请求
    add_header    Cache-Control  max-age=360000;
  }
}
```

### 配置解析含义
```javascript
1. max-age=no-cache 的含义：html文件不设置强制缓存时间，则为协商缓存，使用 Last-Modified。no-cache 会发起往返通信来验证缓存的响应，但如果资源未发生变化，则不会下载，返回304。
2. max-age=360000 的含义：给上面匹配后缀的文件设置强制缓存，且缓存的时间是360000秒，第一次访问的时候，从服务器请求，当除了第一次以外，再次刷新浏览器，会从浏览器缓存读取，那么强制缓存一般是从内存里面先读取，如果内存没有，再从硬盘读取。
```


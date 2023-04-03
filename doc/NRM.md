# npm源管理工具

nrm是一个npm源管理工具，使用它可以快速切换npm源。

## 安装

全局安装：`npm install nrm -g`

## 常用命令

### 查看源列表（前面带*的为当前源）

```bash
nrm ls
```

### 添加新的npm源

```bash
nrm add 别名 源地址
```

### 切换源

```
nrm use 源名称
```

### npm源测速

```
nrm  （测全部）
nrm test 源名称 （指定测速）
```

### 删除源

```
nrm del 源名称
```


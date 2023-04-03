[TOC]

# 多端开发框架 Taro3

当前 Taro 已进入 3.x 时代，相较于 Taro 1/2 编译时架构，Taro 3 采用了重运行时的架构，让开发者可以获得完整的 React / Vue 等框架的开发体验。具体原理请参考 [《小程序跨框架开发的探索与实践》](https://mp.weixin.qq.com/s?__biz=MzU3NDkzMTI3MA==&mid=2247483770&idx=1&sn=ba2cdea5256e1c4e7bb513aa4c837834)。

## Taro UI 

Taro 3 只能配合使用 taro-ui@next 版本

安装命令： `npm i taro-ui@next`

https://taro-ui.aotu.io/#/docs/quickstart

## Taro-hooks

安装命令： `npm i taro-hooks`

https://taro-hooks-innocces.vercel.app/

## 查看Taro 最新版本

`npm info @tarojs/cli`

## 主要版本变动说明

### Taro 3.3[#](http://taro-docs.jd.com/taro/docs/version#taro-33)

Taro 3.3 的主要改动是支持使用 HTML 标签进行开发。

详情请参考 [《Taro 3.3 alpha 发布：用 ant-design 开发小程序？》](https://docs.taro.zone/blog/2021-04-22-Taro-3.3-alpha)。

### Taro 3.2[#](http://taro-docs.jd.com/taro/docs/version#taro-32)

Taro 3.2 新增了对 ReactNative 的支持。

详情请参考 [《Taro 3.2 版本正式发布：React Native 支持，王者归来》](https://docs.taro.zone/blog/2021-04-08-taro-3.2)。

### Taro 3.1[#](http://taro-docs.jd.com/taro/docs/version#taro-31)

Taro 3.1 的主要改动是打造开放式架构，支持以插件的形式编译到任意小程序平台。

详情请参考 [《Taro 正式发布 3.1 版本》](https://docs.taro.zone/blog/2021-03-10-taro-3-1-lts)。

## 升级指南

如何从 Taro 1 / 2 升级到 Taro 3 请参考：[从旧版本迁移到 Taro Next](http://taro-docs.jd.com/taro/docs/migration)。

关于各版本间更详尽的迁移的指南请参考：[《Taro 版本升级权威指南》](http://taro-docs.jd.com/taro/blog/2020-09-01-taro-versions)。

社区贡献的一键升级工具：[taro2-to-3](https://github.com/SyMind/taro2-to-3)，by @SyMind。

# 安装及使用

你需要使用 npm  全局安装 `@tarojs/cli`

```bash
$ npm install -g @tarojs/cli
# 使用 npm 安装 CLI
$ npm install -g @tarojs/cli@1.3.9
```

## 常见问题[#](http://taro-docs.jd.com/taro/docs/GETTING-STARTED#常见问题)

### 保持 CLI 的版本与各端依赖版本一致[#](http://taro-docs.jd.com/taro/docs/GETTING-STARTED#保持-cli-的版本与各端依赖版本一致)

```bash
# 使用Taro 升级命令更新CLI版本到最新版本
$ taro update self [版本号]
# 使用Taro 升级命令更新CLI版本到指定版本
$ taro update self
# 使用Taro 升级命令将项目依赖升级到与@tarojs/cli一致的版本
$ taro update project 
# 使用Taro 升级命令将项目依赖升级到指定版本
$ taro update project [版本号]
```

# Taro Hooks

- [useRouter](http://taro-docs.jd.com/taro/docs/hooks#userouter)
- [useReady](http://taro-docs.jd.com/taro/docs/hooks#useready)
- [useDidShow](http://taro-docs.jd.com/taro/docs/hooks#usedidshow)
- [useDidHide](http://taro-docs.jd.com/taro/docs/hooks#usedidhide)
- [usePullDownRefresh](http://taro-docs.jd.com/taro/docs/hooks#usepulldownrefresh)
- [useReachBottom](http://taro-docs.jd.com/taro/docs/hooks#usereachbottom)
- [usePageScroll](http://taro-docs.jd.com/taro/docs/hooks#usepagescroll)
- [useResize](http://taro-docs.jd.com/taro/docs/hooks#useresize)
- [useShareAppMessage](http://taro-docs.jd.com/taro/docs/hooks#useshareappmessage)
- [useTabItemTap](http://taro-docs.jd.com/taro/docs/hooks#usetabitemtap)
- [useAddToFavorites](http://taro-docs.jd.com/taro/docs/hooks#useaddtofavorites)
- [useShareTimeline](http://taro-docs.jd.com/taro/docs/hooks#usesharetimeline)

# React Hooks

- [useState](http://taro-docs.jd.com/taro/docs/hooks#usestate)
- [useEffect](http://taro-docs.jd.com/taro/docs/hooks#useeffect)
- [useReducer](http://taro-docs.jd.com/taro/docs/hooks#usereducer)
- [useCallback](http://taro-docs.jd.com/taro/docs/hooks#usecallback)
- [useMemo](http://taro-docs.jd.com/taro/docs/hooks#usememo)
- [useRef](http://taro-docs.jd.com/taro/docs/hooks#useref)
- [useLayoutEffect](http://taro-docs.jd.com/taro/docs/hooks#uselayouteffect)
- [useContext](http://taro-docs.jd.com/taro/docs/hooks#usecontext)

# 多端开发问题




# 介绍

本项目是一个纯TS+React项目，也是一个C端项目，做了样式适配，作为学习测试项目并没有引入Redux。项目具备完善的代码检查、样式检查和提交检查等功能。

# 你可以从项目中获得什么？

1. 你可以将最新的知识融入项目
2. 你可以看到别人最优秀的案例
3. 你可以学习到TS和React最常见的知识点
4. 你可以学习到最新的静态路由配置方案
5. 你可以分享知识，提升自身软实力，得到团队认可

# 如何开启新的知识点？

请在doc目录下新建一个.md文件，描述你的知识点。

md编写可以使用：[Typora](https://www.typora.io/)

请在routes.jsx 中新建一个路由，测试你的知识点。

路由的配置可参考：https://www.npmjs.com/package/react-router-config

## 注意事项

如果大家在写一个组件，请定义样式的时候在后面追加-component后缀，防止命名冲突。

例如：ScrollNested 组件最外层样式 scroll-nested-component

如果大家编写了一个路由，落地路由页面的样式请按照路由编写并添加-router，防止命名冲突。

例如：/scroll/more 落地组件是Scroll 和 More ，样式分别是：scroll-router、scroll-more-router

引入文件请使用 '@/'的方式，会有友好的路径提示。

# 分享

分享是提高自身最好的方式：提升表达能力、总结能力、沟通能力、讨论中发现问题，优化学习策略。

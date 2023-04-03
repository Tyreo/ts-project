[TOC]

# [core-js@3](https://github.com/zloirock/core-js/blob/master/docs/zh_CN/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md)

JavaScript 标准库的 polyfill。在 `core-js@3` 中所有稳定的 ECMAScript 功能都增加 `es.` 前缀，ECMAScript 提案增加 `esnext.` 前缀。

```js
// 使用 `core-js` 全部功能打补丁：
import 'core-js';
// 仅仅使用稳定的 `core-js` 功能 - ES 和 web 标准：
import 'core-js/stable';
// 仅仅使用稳定的 ES 功能
import 'core-js/es';

// 如果你想用 `Set` 的补丁
// 所有 `Set`- ES 提案中，相关的功能：
import 'core-js/features/set';
// 稳定的 `Set` ES 功能和来自web标准的功能
// （DOM 集合迭代器）
import 'core-js/stable/set';
// 只有 `Set` 所需的稳定的 ES 功能
import 'core-js/es/set';
// 与上面一致，但不会污染全局命名空间
import Set from 'core-js-pure/features/set';
import Set from 'core-js-pure/stable/set';
import Set from 'core-js-pure/es/set';

// 仅仅为需要的方法打补丁
import 'core-js/feature/set/intersection';
import 'core-js/stable/queque-microtask';
import 'core-js/es/array/from';

// 为 reflect metadata 提案打补丁
import 'core-js/proposals/reflect-metadata';
// 为所有 stage 2+ 的提案打补丁
import 'core-js/stage/2';
```

## Babel

### babel/polyfill

[`@babel/polyfill`](https://babeljs.io/docs/en/next/babel-polyfill.html) 是一个包裹的包，里面仅仅包含 `core-js` 稳定版的引入（在 Babel 6 中也包含提案）和 `regenerator-runtime/runtime`，用来转译 generators 和 async 函数。这个包没有提供从 `core-js@2` 到 `core-js@3` 平滑升级路径：因为这个原因，决定弃用 `@babel/polyfill` 代之以分别引入需要的 `core-js` 和 `regenerator-runtime` 。

```bash
npm i --save core-js regenerator-runtime
```

```js
// before
import '@babel/polyfill';

// after
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```

### @babel/runtime

@babel/runtime 是一个包含 Babel 模块化运行时助手和 regenerator-runtime 版本的库。

`regenerator`：使用不污染全局的生成器运行时

当使用 core-js@3 的时候，@babel/transform-runtime 会从 core-js-pure 这个包里去加载对应的 polyfill 代码，core-js-pure 里面的代码不会污染全局变量，适合第三方库的开发。

在之前的版本中，@babel/runtime 最大的问题就是无法模拟实例上的方法，比如数组的 includes 方法就无法被 polyfill。

@babel/plugin-transform-runtime 的默认配置中，是不会注入对提案的 polyfill 代码。如果想要支持提案中的 API，只需要增加和@babel/preset-env 类似的配置项

```js
"plugins": [
  [
    "@babel/transform-runtime",
    {
      "corejs": { "version": 3, "proposals": true },
      "regenerator": true // 默认
    }
  ]
]
```


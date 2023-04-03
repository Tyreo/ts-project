https://webpack.docschina.org/

# webpack 5

## chunk介绍

在打包过程中，模块会被合并成 chunk。 chunk 合并成 chunk 组，并形成一个通过模块互相连接的图(`ModuleGraph`)

```
module.exports = {
  entry: {
    home: './home.js',
    about: './about.js',
  },
};
```

这会创建出两个名为 `home` 和 `about` 的 chunk 组。 每个 chunk 组都有一个包含一个模块的 chunk：`./home.js` 对应 `home`，`./about.js` 对应 `about`

> 一个 chunk 组中可能有多个 chunk。例如，[SplitChunksPlugin](https://webpack.docschina.org/plugins/split-chunks-plugin/) 会将一个 chunk 拆分为一个或多个 chunk。

chunk 有两种形式：

- `initial(初始化)` 是入口起点的 main chunk。此 chunk 包含为入口起点指定的所有模块及其依赖项。
- `non-initial` 是可以延迟加载的块。可能会出现在使用 [动态导入(dynamic imports)](https://webpack.docschina.org/guides/code-splitting/#dynamic-imports) 或者 [SplitChunksPlugin](https://webpack.docschina.org/plugins/split-chunks-plugin/) 时。

```
import React from 'react';
import ReactDOM from 'react-dom';

import('./app.jsx').then((App) => {
  ReactDOM.render(<App />, root);
});
```

这会创建出一个名为 `main` 的 initial chunk。其中包含：

- `./src/index.jsx`
- `react`
- `react-dom`

以及除 `./app.jsx` 外的所有依赖

然后会为 `./app.jsx` 创建 non-initial chunk，这是因为 `./app.jsx` 是动态导入的。

**Output:**

- `/dist/main.js` - 一个 `initial` chunk
- `/dist/394.js` - `non-initial` chunk

默认情况下，这些 `non-initial` chunk 没有名称，因此会使用唯一 ID 来替代名称。 在使用动态导入时，我们可以通过使用 [magic comment(魔术注释)](https://webpack.docschina.org/api/module-methods/#magic-comments) 来显式指定 chunk 名称：

```
import(
  /* webpackChunkName: "app" */
  './app.jsx'
).then((App) => {
  ReactDOM.render(<App />, root);
});
```

**Output:**

- `/dist/main.js` - 一个 `initial` chunk
- `/dist/app.js` - `non-initial` chunk

### output(输出)

输出文件的名称会受配置中的两个字段的影响：

- [`output.filename`](https://webpack.docschina.org/configuration/output/#outputfilename) - 用于 `initial` chunk 文件
- [`output.chunkFilename`](https://webpack.docschina.org/configuration/output/#outputchunkfilename) - 用于 `non-initial` chunk 文件
- 在某些情况下，使用 `initial` 和 `non-initial` 的 chunk 时，可以使用 `output.filename`。

这些字段中会有一些 [占位符](https://webpack.docschina.org/configuration/output/#template-strings)。常用的占位符如下：

- `[id]` - chunk id（例如 `[id].js` -> `485.js`）
- `[name]` - chunk name（例如 `[name].js` -> `app.js`）。如果 chunk 没有名称，则会使用其 id 作为名称
- `[contenthash]` - 输出文件内容的 md4-hash（例如 `[contenthash].js` -> `4ea6ff1de66c537eb9b2.js`）

## 模块热替换(hot module replacement)

有关 `module.hot` 接口的详细信息，请查看 [HMR API 页面](https://webpack.docschina.org/api/hot-module-replacement)。

然而在多数情况下，不需要在每个模块中强行写入 HMR 代码。如果一个模块没有 HMR 处理函数，更新就会冒泡(bubble up)。这意味着某个单独处理函数能够更新整个模块树。如果在模块树的一个单独模块被更新，那么整组依赖模块都会被重新加载。

在开发环境，可以将 HMR 作为 LiveReload 的替代。[webpack-dev-server](https://webpack.docschina.org/configuration/dev-server/) 支持 `hot` 模式，在试图重新加载整个页面之前，`hot` 模式会尝试使用 HMR 来更新。

## webpack中的代码

1. 你或你的团队编写的源码。
2. 你的源码会依赖的任何第三方的 library 或 "vendor" 代码。
3. webpack 的 runtime 和 **manifest**，管理所有模块的交互。

### runtime

runtime，以及伴随的 manifest 数据，主要是指：在浏览器运行过程中，webpack 用来连接模块化应用程序所需的所有代码。它包含：在模块交互时，连接模块所需的加载和解析逻辑。包括：已经加载到浏览器中的连接模块逻辑，以及尚未加载模块的延迟加载逻辑。

### manifest

一旦你的应用在浏览器中以 `index.html` 文件的形式被打开，一些 bundle 和应用需要的各种资源都需要用某种方式被加载与链接起来。在经过打包、压缩、为延迟加载而拆分为细小的 chunk 这些 webpack [`优化`](https://webpack.docschina.org/configuration/optimization/) 之后，你精心安排的 `/src` 目录的文件结构都已经不再存在。所以 webpack 如何管理所有所需模块之间的交互呢？这就是 manifest 数据用途的由来……

当 compiler 开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为 "manifest"，当完成打包并发送到浏览器时，runtime 会通过 manifest 来解析和加载模块。无论你选择哪种 [模块语法](https://webpack.docschina.org/api/module-methods)，那些 `import` 或 `require` 语句现在都已经转换为 `__webpack_require__` 方法，此方法指向模块标识符(module identifier)。通过使用 manifest 中的数据，runtime 将能够检索这些标识符，找出每个标识符背后对应的模块。

## target

示例中，将会在 `dist` 文件夹下创建 `lib.js` 和 `lib.node.js` 文件。

```
const path = require('path');
const serverConfig = {
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.node.js',
  },
  //…
};

const clientConfig = {
  target: 'web', // <=== 默认为 'web'，可省略
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.js',
  },
  //…
};

module.exports = [serverConfig, clientConfig];
```

## Further Reading（HTTP2）

- [HTTP2 Aggressive Splitting Example](https://github.com/webpack/webpack/tree/master/examples/http2-aggressive-splitting)
- [webpack & HTTP/2](https://medium.com/webpack/webpack-http-2-7083ec3f3ce6)

https://webpack.docschina.org/concepts/module-federation/




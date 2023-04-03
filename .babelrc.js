module.exports = {
  presets: [
    [
      '@babel/preset-env', // 只转换新的语法，并不对新的api进行处理
      {
        useBuiltIns: 'usage', // 按需注入新的API
        corejs: 3,
        modules: false // 编译后不会转化成CommonJS
      }
    ],
    '@babel/typescript',
    '@babel/react'
  ],
  plugins: [
    [
      // 用于提供一些公共的API，这些API会帮助代码转换
      // 在之前的版本中，@babel/runtime最大的问题就是无法模拟实例上的方法，比如数组的includes方法就无法被polyfill。
      // 当使用core-js@3的时候，@babel/transform-runtime会从core-js-pure这个包里去加载对应的polyfill代码
      '@babel/transform-runtime',
      {
        corejs: 3
        // @babel/plugin-transform-runtime的默认配置中，是不会注入对提案的polyfill代码。如果想要支持提案中的API，只需要增加和@babel/preset-env类似的配置项
        // "corejs": { "version": 3, "proposals": true }
      }
    ]
  ]
};

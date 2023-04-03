module.exports = {
  root: true,
  extends: ['plugin:compat/recommended', 'alloy', 'alloy/react', 'alloy/typescript'],
  plugins: ['prettier', 'react-hooks'],
  env: {
    // 这里填入你的项目用到的环境
    browser: true,
    node: true
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 您的全局变量（设置为 false 表示它不允许被重新赋值）
    globalThis: false,
    NodeJS: true
  },
  rules: {
    'compat/compat': ['warn'],
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
    // 自定义您的规则
  },
  settings: {
    react: {
      version: '17.0.2' // React version. "detect" automatically picks the version you have installed.
    },
    polyfills: ['Promise']
  }
};

const autoprefixer = require('autoprefixer');
const postcssFixFlexbugs = require('postcss-flexbugs-fixes');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  plugins: [
    autoprefixer(),
    postcssFixFlexbugs,
    pxtorem({
      rootValue: 75,
      propWhiteList: []
    })
  ]
};

module.exports = {
  plugins: ['stylelint-no-unsupported-browser-features'],
  extends: ['stylelint-scss', 'stylelint-config-sass-guidelines'],
  ignoreFiles: ['plop-templates/**/*'],
  rules: {
    'plugin/no-unsupported-browser-features': [
      true,
      {
        ignore: ['rem'],
        ignorePartialSupport: true,
        severity: 'warning'
      }
    ],
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'declaration-block-trailing-semicolon': 'always',
    'max-nesting-depth': 5,
    'selector-max-id': 5,
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested']
      }
    ],
    'unit-allowed-list': ['px', 'PX', '%', 'rem', 'deg', 'vh', 'vw', 'ms'],
    'property-no-unknown': null,
    'scss/at-rule-no-unknown': true
  }
};

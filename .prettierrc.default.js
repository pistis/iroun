// prettier configuration
// https://prettier.io/docs/en/options.html

/*
 * Displayed using eslint rules instead of prettier
  // "max-len": ["error", { "code": 80, "ignoreUrls": true }], // printWidth: 80,
  // "semi": ["error", "always"], // semi: true
  // "indent": ["error", 2], // useTabs: false, tabWidth: 2
  // "quotes": ["error", "single"], // singleQuote: true
  // "comma-dangle": ["error"], // trailingComma: 'all'
  // "object-curly-spacing": ["error", "always"], // bracketSpacing: true
  // "arrow-parens": ["error", "as-needed"], // arrowParens: 'avoid'
  // "space-in-parens": ["error", "never"],
  // "space-before-function-paren": ["error", "always"],
  // "keyword-spacing": ["error", { "before": true, "after": true }],
 */

module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: false,
  trailingComma: 'none',
  bracketSpacing: true,
  arrowParens: 'avoid',
  rangeStart: 0,
  rangeEnd: Infinity,
  requirePragma: false,
  insertPragma: false,
  proseWrap: 'preserve',
  parser: 'babylon',
}

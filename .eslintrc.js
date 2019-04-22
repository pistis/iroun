// eslint configurations
const prettierrc = require('./.prettierrc')

module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  plugins: ['prettier'],
  // "parser": "babel-eslint",
  // "parserOptions": {
  //   "sourceType": "module",
  //   "ecmaFeatures": {
  //     "jsx": true
  //   }
  // },
  rules: {
    'prettier/prettier': ['error'],

    // More rules
    'linebreak-style': ['error', 'unix'],
    'prefer-const': 'error',
    'no-var': 'error',
    'no-console': 'warn',
  },
}

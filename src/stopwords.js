const stopwordsJson = require('stopwords-json')
// https://www.w3schools.in/javascript-tutorial/keywords/
// TODO : HTML, CSS reserved keywords
const ECMAReservedKeywords = [
  'abstract',
  'arguments',
  'boolean',
  'break',
  'byte',
  'case',
  'catch',
  'char',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'double',
  'else',
  'eval',
  'false',
  'final',
  'finally',
  'float',
  'for',
  'function',
  'goto',
  'if',
  'implements',
  'in',
  'instanceof',
  'int',
  'interface',
  'let',
  'long',
  'native',
  'new',
  'null',
  'package',
  'private',
  'protected',
  'public',
  'return',
  'short',
  'static',
  'switch',
  'synchronized',
  'this',
  'throw',
  'throws',
  'transient',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'volatile',
  'while',
  'with',
  'yield',
  'class',
  'enum',
  'export',
  'extends',
  'import',
  'super',
]

const stopwords = new Map()
stopwordsJson.en.forEach((word) => {
  stopwords.set(word.toLowerCase(), true)
})

ECMAReservedKeywords.forEach((word) => {
  stopwords.set(word.toLowerCase(), true)
})

module.exports = stopwords

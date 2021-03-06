const stopwordsJson = require('stopwords-json')

const JSObjectPropertyMethods = [
  'Array',
  'Date',
  'eval',
  'function',
  'hasOwnProperty',
  'Infinity',
  'isFinite',
  'isNaN',
  'isPrototypeOf',
  'length',
  'Math',
  'NaN',
  'name',
  'Number',
  'Object',
  'prototype',
  'String',
  'toString',
  'undefined',
  'valueOf',
]
const otherReservedKeywords = [
  'alert',
  'all',
  'anchor',
  'anchors',
  'area',
  'assign',
  'blur',
  'button',
  'checkbox',
  'clearInterval',
  'clearTimeout',
  'clientInformation',
  'close',
  'closed',
  'confirm',
  'constructor',
  'crypto',
  'decodeURI',
  'decodeURIComponent',
  'defaultStatus',
  'document',
  'element',
  'elements',
  'embed',
  'embeds',
  'encodeURI',
  'encodeURIComponent',
  'escape',
  'event',
  'fileUpload',
  'focus',
  'form',
  'forms',
  'frame',
  'innerHeight',
  'innerWidth',
  'layer',
  'layers',
  'link',
  'location',
  'mimeTypes',
  'navigate',
  'navigator',
  'frames',
  'frameRate',
  'hidden',
  'history',
  'image',
  'images',
  'offscreenBuffering',
  'open',
  'opener',
  'option',
  'outerHeight',
  'outerWidth',
  'packages',
  'pageXOffset',
  'pageYOffset',
  'parent',
  'parseFloat',
  'parseInt',
  'password',
  'pkcs11',
  'plugin',
  'prompt',
  'propertyIsEnum',
  'radio',
  'reset',
  'screenX',
  'screenY',
  'scroll',
  'secure',
  'select',
  'self',
  'setInterval',
  'setTimeout',
  'status',
  'submit',
  'taint',
  'text',
  'textarea',
  'top',
  'unescape',
  'untaint',
  'window',
  '',
]
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

const conventionalKeywords = ['el', 'res', 'req', 'key', 'value', 'id', 'ref', 'msg', 'set', 'get']
const stopwords = new Map()
stopwordsJson.en
  .concat(ECMAReservedKeywords)
  .concat(JSObjectPropertyMethods)
  .concat(otherReservedKeywords)
  .concat(conventionalKeywords)
  .forEach((word) => {
    stopwords.set(word.toLowerCase(), true)
  })

module.exports = stopwords

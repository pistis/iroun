/**
 * This script analyzes all Javascript source code for a specific project.
 * Exceptions are as follows:
 *
 * Additional Information
 * - There is already a dataset analyzing 100 github javascript based open source projects with many stars. (dataset/words directory)
 * - The error rate due to file parsing failure is about 1%. (This part will be reinforced continuously.)
 *
 * Ignored directory name. (exact matching)
 * - dist,test,_test_,__test__,tests,_tests_,__tests__,example,examples,node_modules,bower_components
 *
 * Ignored file name. (include word)
 * - test, spec, min.js
 *
 * Source code type to analyze
 * - .js, .vue, .ts
 */
const stopwords = require('../../src/stopwords')
const { getFilesOfDirectory, filterAnalysisFile } = require('../helper/utils')
const { extractFromFile } = require('../../src/extractor')
const { split } = require('../../src/splitter')

const ignoreDirNames = [
  'dist',
  'test',
  '_test_',
  '__test__',
  'tests',
  '_tests_',
  '__tests__',
  'example',
  'examples',
  'node_modules',
  'bower_components',
]

async function extractWord(sourceDirectory) {
  let fileList = getFilesOfDirectory(sourceDirectory, [], ignoreDirNames)
  fileList = filterAnalysisFile(fileList)
  let words = []
  const errors = []
  const addWords = (names) => {
    Object.keys(names).forEach((name) => {
      let freq = names[name]
      for (let i = 0; i < freq; i++) {
        words = words.concat(split(name))
      }
    })
  }
  fileList.forEach((file, i) => {
    try {
      let names = extractFromFile(file)
      addWords(names.classNames)
      addWords(names.methodNames)
      addWords(names.variableNames)
      addWords(names.parameterNames)
      addWords(names.argumentNames)
      addWords(names.attributeNames)
    } catch (e) {
      errors.push({
        file: file,
        msg: e,
      })
    }
  })

  const result = {
    originalWordLength: words.length,
  }
  // filter stopwords
  words = words.filter((word) => {
    return !stopwords.has(word.toLowerCase())
  })

  result.extractWordLength = words.length
  result.extractWordText = words.join(' ')
  result.errorFiles = errors.map((error) => error.file)
  return result
}

module.exports = {
  extractWord,
}

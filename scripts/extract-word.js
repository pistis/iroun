const fs = require('fs')
const path = require('path')
const stopwords = require('../src/stopwords')
const walk = require('acorn-walk')
const {
  resolvePath,
  getFilesOfDirectory,
  getJavascriptFileList,
  saveFile,
} = require('./util')
const { extractFromFile } = require('../src/extractor')
const { split } = require('../src/splitter')

const makeWordFile = function(dir, output) {
  console.time(dir)
  let fileList = getFilesOfDirectory(resolvePath(dir))
  fileList = getJavascriptFileList(fileList)

  console.log(
    `\n===== Start anaysis ${fileList.length} file list in [${dir}] =====`
  )

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

  if (errors.length > 1) {
    console.log(`Error Files : ${errors.length}`)
    // console.log(JSON.stringify(errors))
    console.log(`Error AST Types : ${JSON.stringify(walk.errorTypes)}`)
  }

  // filter stopwords
  console.log(`Original Word List ${words.length}`)
  words = words.filter((word) => {
    return !stopwords.has(word.toLowerCase())
  })
  console.log(`Filtered/Saved Word List ${words.length}`)
  saveFile(resolvePath(output), words.join(' '))

  console.timeEnd(dir)
}

module.exports = {
  makeWordFile,
}

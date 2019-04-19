const acorn = require('acorn')
const walk = require('acorn-walk')
const fs = require('fs')
const path = require('path')
const extractClassname = require('./extractor/classname')
const extractMethodname = require('./extractor/methodname')
const extractVariablename = require('./extractor/variablename')
const extractParametername = require('./extractor/parametername')
const extractArgumentsname = require('./extractor/argumentsname')
const extractAttributename = require('./extractor/attributename')

const resolve = file => path.resolve(__dirname, file)

const walkSync = function (dir, filelist = []) {
  fs.readdirSync(dir).forEach(file =>{
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist;
}

const getJavascriptFileList = function (repository) {
  let fileList = walkSync(repository)
  fileList = fileList.filter((file) =>{
    return file.match(/\.js$/g)
  })
  return fileList
}

const classNames = new Map()
const methodNames = new Map()
const variableNames = new Map()
const parameterNames = new Map()
const argumentsNames = new Map()
const attributeNames = new Map()
const allNames = new Map()

const combineMaps = function(results, maps) {
  maps.forEach((value, key) => {
    if (results.has(key)) {
      results.set(key, results.get(key) + 1)
    } else {
      results.set(key, 1)
    }
  })
}
const _extract = function (fileList) {
  fileList.forEach((file, idx) =>{
    const program = fs.readFileSync(file, 'utf-8')

    const ast = acorn.parse(program, {
      sourceType: 'module',
      ecmaVersion: 9
    })
    try {
      combineMaps(classNames, extractClassname(ast))
      combineMaps(methodNames, extractMethodname(ast))
      combineMaps(variableNames, extractVariablename(ast))
      combineMaps(parameterNames, extractParametername(ast))
      combineMaps(argumentsNames, extractArgumentsname(ast))
      combineMaps(attributeNames, extractAttributename(ast))
    } catch(e) {
      console.log('!! Failed analysis ', file)
      console.error(e)
      process.exit()
    }
  })

  combineMaps(allNames, classNames)
  combineMaps(allNames, methodNames)
  combineMaps(allNames, variableNames)
  combineMaps(allNames, parameterNames)
  combineMaps(allNames, argumentsNames)
  combineMaps(allNames, attributeNames)

  const list = []
  allNames.forEach((value, key) => {
    list.push(`${key} ${value}`)
  })

  console.log(list.join('\n'))
  // fs.writeFileSync(resolve('../.tmp/results.txt'), list.join('\n'), {
  //   encoding : 'utf8',
  //   flag : 'w+'
  // })
}


const extract = function (path) {
  let fileList = getJavascriptFileList(resolve(path))
  console.log(`===== Start anaysis ${fileList.length} file list =====`)
  _extract(fileList)
}

module.exports = {
  extract
}
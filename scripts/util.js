const fs = require('fs')
const path = require('path')

const resolvePath = (file) => path.resolve(__dirname, file)

const getFilesOfDirectory = function(dir, filelist = []) {
  const ignoreDirWord = [
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
  fs.readdirSync(dir).forEach((file) => {
    let absFile = path.join(dir, file)
    if (fs.lstatSync(absFile).isSymbolicLink()) return
    if (fs.statSync(absFile).isDirectory()) {
      if (
        ignoreDirWord.some((word) => {
          return file === word
        })
      ) {
        return
      }
      filelist = getFilesOfDirectory(absFile, filelist)
    } else {
      filelist = filelist.concat(absFile)
    }
  })
  return filelist
}

const getJavascriptFileList = function(fileList) {
  return fileList
    .filter((file) => file.match(/\.js$|.vue$|.ts$/g))
    .filter(
      (file) =>
        file.indexOf('test') === -1 &&
        file.indexOf('spec') === -1 &&
        file.indexOf('min.js') === -1 &&
        file.indexOf('.min') === -1
    )
}

const saveFile = function(file, text) {
  fs.writeFileSync(file, text, {
    encoding: 'utf8',
    flag: 'w+',
  })
}

module.exports = {
  resolvePath,
  getFilesOfDirectory,
  getJavascriptFileList,
  saveFile,
}

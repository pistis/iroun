const fs = require('fs')
const path = require('path')
const spawn = require('child_process').spawn

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

const cloneRepository = async function(repoUrl, targetPath) {
  return new Promise((resolve, reject) => {
    const git = spawn('git', ['clone', repoUrl, '--progress', targetPath])
    git.on('close', function(status) {
      if (status === 0) {
        resolve(targetPath)
      } else {
        reject(status)
      }
    })
  })
}
module.exports = {
  resolvePath,
  getFilesOfDirectory,
  getJavascriptFileList,
  saveFile,
  cloneRepository,
}

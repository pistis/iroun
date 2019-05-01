const fs = require('fs')
const path = require('path')

const resolvePath = (file) => path.resolve(__dirname, file)

const getFilesOfDirectory = function(dir, filelist = []) {
  fs.readdirSync(dir).forEach((file) => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? getFilesOfDirectory(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file))
  })
  return filelist
}

const getJavascriptFileList = function(fileList) {
  return fileList
    .filter((file) => file.match(/\.js$|.vue$/g))
    .filter((file) => file.indexOf('test') === -1)
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

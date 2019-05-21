const fs = require('fs-extra')
const path = require('path')
const execa = require('execa')
const chalk = require('chalk')

function getVersion() {
  return require(`../../package.json`).version
}

function cloneRepository(gitUrl, targetDir) {
  const cwd = process.cwd()
  return new Promise((resolve, reject) => {
    const cloneDir = path.resolve(targetDir, 'gitrepo')
    const child = execa('git', ['clone', gitUrl, cloneDir], {
      cwd: cwd,
      stdio: ['inherit', 'inherit', 'inherit'],
    })
    child.on('close', (code) => {
      if (code !== 0) {
        reject(code)
      } else {
        resolve(cloneDir)
      }
    })
  })
}

function exit(code) {
  process.exit(code)
}

function resolvePath(file) {
  return path.resolve(__dirname, file)
}

function getFilesOfDirectory(dir, filelist = [], ignoreDirNames = []) {
  fs.readdirSync(dir).forEach((file) => {
    let absFile = path.join(dir, file)
    if (fs.lstatSync(absFile).isSymbolicLink()) return
    if (fs.statSync(absFile).isDirectory()) {
      if (
        ignoreDirNames.some((word) => {
          return file === word
        })
      ) {
        return
      }
      filelist = getFilesOfDirectory(absFile, filelist, ignoreDirNames)
    } else {
      filelist = filelist.concat(absFile)
    }
  })
  return filelist
}

function filterAnalysisFile(fileList) {
  return fileList
    .filter((file) => path.basename(file).match(/\.js$|.vue$|.ts$/g))
    .filter(
      (file) =>
        path.basename(file).indexOf('test') === -1 &&
        path.basename(file).indexOf('spec') === -1 &&
        path.basename(file).indexOf('min.js') === -1 &&
        path.basename(file).indexOf('.min') === -1
    )
}

function saveFile(file, text) {
  fs.writeFileSync(file, text, {
    encoding: 'utf8',
    flag: 'w+',
  })
}

module.exports = {
  getVersion,
  cloneRepository,
  exit,
  resolvePath,
  getFilesOfDirectory,
  filterAnalysisFile,
  saveFile,
}

const path = require('path')
const execa = require('execa')
const chalk = require('chalk')

exports.getVersion = () => {
  return require(`../../package.json`).version
}

exports.cloneRepository = (gitUrl, targetDir) => {
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

exports.exit = function(code) {
  process.exit(code)
}

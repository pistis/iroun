const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const execa = require('execa')
const { logWithSpinner, stopSpinner } = require('../../lib/helper/spinner')
const { log, error, clearConsole } = require('../../lib/helper/logger')

const resolvePath = (file) => path.resolve(__dirname, file)

function cloneRepository(gitUrl, targetDir) {
  const cwd = process.cwd()
  return new Promise((resolve, reject) => {
    const child = execa('git', ['clone', gitUrl, targetDir], {
      cwd: cwd,
      stdio: ['inherit', 'inherit', 'inherit'],
    })
    child.on('close', (code) => {
      if (code !== 0) {
        reject(code)
      } else {
        resolve(targetDir)
      }
    })
  })
}

async function run() {
  const repoUrlJson = resolvePath('./data/top-stars-github-repo.json')
  const repoUrls = JSON.parse(fs.readFileSync(repoUrlJson, 'utf-8'))

  clearConsole('Clone Repositories')
  // logWithSpinner(`✨`, `Clone Repositories`)
  // const repo = repoUrls[0]
  for (let repo of repoUrls) {
    // logWithSpinner(`✨`, `git clone ${repo.clone_url}\n`)
    try {
      const cloneDir = await cloneRepository(repo.clone_url, resolvePath(`../../.resources/${repo.name}`))
      log(chalk.bold.blue(cloneDir))
      // stopSpinner(true)
    } catch (e) {
      error(`Failed git clone ${repo.clone_url}\n`)
      // stopSpinner(true)
    }
  }
  // stopSpinner(true)
  log(chalk.bold.blue(`🎉 Cloned Total ${repoUrls.length} git repositories...`))
}

run()

const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')
const { getVersion } = require('./utils')
const { log, error, clearConsole } = require('./logger')
const { logWithSpinner, stopSpinner } = require('./spinner')

async function analyze(projectName, options) {
  const cwd = process.cwd()
  const targetDir = path.resolve(cwd, projectName)

  // console.log(targetDir, fs.existsSync(targetDir))
  if (fs.existsSync(targetDir)) {
    const { action } = await inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message: `Output directory ${chalk.cyan(targetDir)} already exists. Pick an action:`,
        choices: [
          { name: 'Overwrite', value: 'overwrite' },
          { name: 'Merge', value: 'merge' },
          { name: 'Cancel', value: false },
        ],
      },
    ])
    if (!action) {
      return
    } else if (action === 'overwrite') {
      console.log(`\nRemoving ${chalk.cyan(targetDir)}...`)
      await fs.remove(targetDir)
    }
  }

  const { action } = await inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: `Specify the analysis type. Pick an action:`,
      choices: [{ name: 'Topic words', value: 'topic-word' }, { name: 'Cancel', value: false }],
    },
  ])

  if (!action) {
    return
  } else if (action === 'topic-word') {
    const { action } = await inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message: `Enter the URL of your project path and the URL of your Github. Pick an action:`,
        choices: [
          { name: 'Git URL', value: 'git-url' },
          { name: 'Project Path', value: 'project-path' },
          { name: 'Cancel', value: false },
        ],
      },
    ])

    if (!action) {
      return
    } else if (action === 'git-url') {
      clearConsole(chalk.bold.blue(`iroun CLI v${getVersion()}`))
      logWithSpinner(`✨`, `Cloning git project ${chalk.yellow('URL...')}.`)
      setTimeout(() => {
        stopSpinner()
      }, 1000)
      // TODO : to be continue....
    } else if (action === 'project-path') {
      error('Not yet supported action')
    }
  }
}

module.exports = (...args) => {
  return analyze(...args).catch((err) => {
    // stopSpinner(false) // do not persist
    error(err)
    process.exit(1)
  })
}

const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')
const { exit, getTitle, getVersion, cloneRepository } = require('../helper/utils')
const { error, clearConsole } = require('../helper/logger')

async function stepCheckTargetDir(targetDir) {
  const { directoryAction } = await inquirer.prompt([
    {
      name: 'directoryAction',
      type: 'list',
      message: `Output directory ${chalk.cyan(targetDir)} already exists. Pick an action:`,
      choices: [
        { name: 'Overwrite', value: 'overwrite' },
        { name: 'Merge', value: 'merge' },
        { name: 'Cancel', value: false },
      ],
    },
  ])
  return directoryAction
}
async function stepSubFeature() {
  const { feature } = await inquirer.prompt([
    {
      name: 'feature',
      type: 'list',
      message: `Specify the analysis type. Pick an action:`,
      choices: [{ name: 'Topic words', value: 'topic-word' }, { name: 'Cancel', value: false }],
    },
  ])

  return feature
}

async function stepInputSource() {
  const { input } = await inquirer.prompt([
    {
      name: 'input',
      type: 'list',
      message: `Enter the URL of your project path or the URL of your Github. Pick an action:`,
      choices: [
        { name: 'Git URL', value: 'git-url' },
        { name: 'Project Path', value: 'project-path' },
        { name: 'Cancel', value: false },
      ],
    },
  ])

  return input
}

async function stepInputGitUrl() {
  const { gitUrl } = await inquirer.prompt([
    {
      name: 'gitUrl',
      type: 'input',
      message: `Enter the URL of Github.:`,
    },
  ])

  return gitUrl
}

async function stepInputProjectDir() {
  const { projectDir } = await inquirer.prompt([
    {
      name: 'projectDir',
      type: 'input',
      message: `Enter the directory path of your project:`,
    },
  ])

  return projectDir
}

async function prepare(projectName) {
  const cwd = process.cwd()
  const targetDir = path.resolve(cwd, projectName)

  if (fs.existsSync(targetDir)) {
    const directoryAction = await stepCheckTargetDir(targetDir)
    if (!directoryAction) {
      exit(1)
    } else if (directoryAction === 'overwrite') {
      await fs.remove(targetDir)
      await fs.ensureDir(targetDir)
    }
  } else {
    await fs.ensureDir(targetDir)
  }

  const feature = await stepSubFeature()
  if (!feature) exit(1)

  let input = false
  if (feature === 'topic-word') {
    input = await stepInputSource()
  }

  if (!input) exit(1)

  let gitUrl
  let projectDir
  if (input === 'git-url') {
    gitUrl = await stepInputGitUrl()
  } else if (input === 'project-path') {
    projectDir = await stepInputProjectDir()
    projectDir = path.resolve(cwd, projectDir)
  }

  clearConsole(chalk.bold.blue(`iroun CLI v${getVersion()}`))

  let cloneDir
  if (gitUrl) {
    try {
      cloneDir = await cloneRepository(gitUrl, targetDir)
    } catch (e) {
      error(`command failed: git clone '${gitUrl}' status code is ${e}`)
    }
    return cloneDir
  } else if (projectDir) {
    if (!fs.existsSync(projectDir)) {
      error('Not exist project directory')
    }
    return projectDir
  }

  throw 'need source code information'
}

module.exports = prepare

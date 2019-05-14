#!/usr/bin/env node
// @reference : https://github.com/vuejs/vue-cli
const chalk = require('chalk')
const semver = require('semver')
const requiredVersion = require('../package.json').engines.node
const didYouMean = require('didyoumean')

// Setting edit distance to 60% of the input string's length
didYouMean.threshold = 0.6

function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(
      chalk.red(
        'You are using Node ' +
          process.version +
          ', but this version of ' +
          id +
          ' requires Node ' +
          wanted +
          '.\nPlease upgrade your Node version.'
      )
    )
    process.exit(1)
  }
}

checkNodeVersion(requiredVersion, 'iroun')

const fs = require('fs')
const path = require('path')
const slash = require('slash')
const minimist = require('minimist')

const program = require('commander')

program.version(require('../package').version).usage('<command> [options]')
program
  .command('analyze <project-name>')
  .description('analyze a your project powered by iroun-cli-service')
  .action((name, cmd) => {
    // if need option
    // const options = cleanArgs(cmd)
    // console.log(options)

    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(
        chalk.yellow(
          "\n Info: You provided more than one argument. The first one will be used as the project's name, the rest are ignored."
        )
      )
    }

    require('../lib/analyze')(name)
  })

program.arguments('<command>').action((cmd) => {
  program.outputHelp()
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
  console.log()
  suggestCommands(cmd)
})

program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`iroun <command> --help`)} for detailed usage of given command.`)
  console.log()
})

program.commands.forEach((c) => c.on('--help', () => console.log()))

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

function suggestCommands(cmd) {
  const availableCommands = program.commands.map((cmd) => {
    return cmd._name
  })

  const suggestion = didYouMean(cmd, availableCommands)
  if (suggestion) {
    console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`))
  }
}

function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs(cmd) {
  const args = {}
  cmd.options.forEach((o) => {
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}

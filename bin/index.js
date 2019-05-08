#!/usr/bin/env node
const program = require('commander')
const ora = require('ora')

program.version('0.2.0', '-v, --version')
program.option('-d, --directory-path <type>', 'set javascript source code absolute directory path.')
program.on('--help', function() {
  console.log('')
  console.log('Examples:')
  console.log('  $ iroun -d "absolute directory path."')
})

program.parse(process.argv)

if (!program.directoryPath) {
  console.log('set the source code directory.')
  console.log('')
  console.log('Examples:')
  console.log('  $ iroun -d "absolute directory path."')
  process.exit()
}

const spinner = ora({
  text: 'Analyzing...',
  spinner: 'arrow3',
}).start()
setTimeout(function() {
  if (program.directoryPath) {
    // if finish analsys
    spinner.stop()
    console.log('Topic Words Dataset is ...')
  }
}, 3000)

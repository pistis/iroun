#!/usr/bin/env node
const program = require('commander')
const path = require('path')
const ora = require('ora')
const delay = require('delay')
const _ = require('lodash')
const { analyzeWord, analyzeTopicWord } = require('../scripts/analyze-topic-word')
const { resolvePath, saveFile } = require('../scripts/util')

const resolvePathArgv = (file) => path.resolve(process.cwd(), file)

program.version('0.2.0', '-v, --version')
program.option('-n, --project-name <type>', 'set project name.')
program.option('-s, --source-directory-path <type>', 'set javascript source code directory path.')
program.option('-o, --output-directory-path <type>', 'set output directory path.')
program.on('--help', function() {
  console.log('')
  console.log('Examples:')
  console.log('  $ iroun -n "project name" -s "source directory path" -o "output directory path"')
})

program.parse(process.argv)

if (!program.sourceDirectoryPath || !program.outputDirectoryPath || !program.projectName) {
  console.log('set project name and source code/output directory.')
  console.log('')
  console.log('Examples:')
  console.log('  $ iroun -n "project name" -s "source directory path" -o "output directory path"')
  process.exit()
}

async function run() {
  const spinner = ora({
    text: `Extract word of "${resolvePathArgv(program.sourceDirectoryPath)}"`,
    spinner: 'arrow3',
  }).start()

  await delay(1000)

  let result
  try {
    result = await analyzeWord(resolvePathArgv(program.sourceDirectoryPath))
  } catch (e) {
    spinner.fail(`Extracted word task failure, ${e}`)
    process.exit()
  }

  spinner.succeed(
    `Extracted Word Information [Original Word Count: ${result.originalWordLength}], [Sanitized Word Count: ${
      result.extractWordLength
    }]`
  )

  spinner.start(`Analyze word of "${resolvePathArgv(program.sourceDirectoryPath)}"`)
  await delay(1000)

  // @ref terms format (natural npm package)
  // {
  //   term: 'term',
  //   tf: 'tf',
  //   idf: 'idf',
  //   tfidf: 'tdidf'
  // }
  let terms
  try {
    terms = await analyzeTopicWord(result.wordText, program.projectName)
  } catch (e) {
    spinner.fail(`Analyze word task failure, ${e}`)
    process.exit()
  }

  // for wordcloud input text file
  terms.forEach((term) => {
    term.freq = term.tfidf < 1 ? 1 : parseInt(term.tfidf)
  })

  const wordCloudInput = terms.map((term) => {
    return `${term.freq} ${term.term}`
  })

  const outputWordCloud = resolvePathArgv(
    `${program.outputDirectoryPath}/topic-${program.projectName}-word-for-wordclouds.com.txt`
  )
  try {
    saveFile(outputWordCloud, wordCloudInput.join('\n'))
  } catch (e) {
    spinner.fail(`Analyze word task failure, ${e}`)
    process.exit()
  }

  // for wordart input text file
  const wordArtInput = terms
    .map((term) => {
      return _.range(term.freq)
        .map(() => term.term)
        .join(' ')
    })
    .join(' ')

  const outputWordArt = resolvePathArgv(
    `${program.outputDirectoryPath}/topic-${program.projectName}-word-for-wordart.com.txt`
  )
  try {
    saveFile(outputWordArt, wordArtInput)
  } catch (e) {
    spinner.fail(`Analyze word task failure, ${e}`)
    process.exit()
  }

  const succeedText = `Analysis completed\n
  1. Copy all the text in the output file\n
  2. You can create your own word cloud image at wordclouds.com or wordart.com.\n
    - for wordclouds.com : ${outputWordCloud}
    - for wordart.com : ${outputWordArt}
  `
  spinner.succeed(succeedText)
  spinner.stop()
}

run()

const chalk = require('chalk')
const { logWithSpinner, stopSpinner } = require('../helper/spinner')
const { log, error, clearConsole } = require('../helper/logger')
const { exit } = require('../helper/utils')
const { extractWord } = require('./extract')
const { analyzeTopicWord } = require('./topic-word')
const { saveWordCloudSource } = require('./wordcloud')

module.exports = async (sourceDirectory) => {
  logWithSpinner(`✨`, `extract word...`)
  const result = await extractWord(sourceDirectory)
  stopSpinner(true)

  logWithSpinner(`✨`, `analyze topic word...`)

  let terms
  try {
    terms = await analyzeTopicWord(result.extractWordText, 'analysis source')
  } catch (e) {
    stopSpinner(true)
    error(`\nanalyze topic word task failure`)
    error(e)
    exit(1)
  }
  stopSpinner(true)
  log('\n')

  const wordCloudSource = await saveWordCloudSource(terms)
  clearConsole(chalk.bold.blue('🎉 Analysis Information (Topic Word)'))

  log(`\n
  1. Copy all the text in the output file.
    - ${chalk.bold.blue('open ' + wordCloudSource)}
  2. Go to the free online word cloud service you have chosen.
    - ${chalk.cyan('https://wordart.com/')}
    - ${chalk.cyan('https://wordclouds.com')}
  3. Paste the copied data according to the service guide.
  4. You can create your own word cloud image and download.
  `)
}

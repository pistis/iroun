const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const _ = require('lodash')
const chalk = require('chalk')
const { exit, saveFile } = require('../helper/utils')
const { error } = require('../helper/logger')

const WORD_CLOUD_SERVICE = {
  WORDART_COM: 'WORDART_COM',
  WORDCLOUDS_COM: 'WORDCLOUDS_COM',
}

async function stepChoiceWordCloudService() {
  const { wordCloudService } = await inquirer.prompt([
    {
      name: 'wordCloudService',
      type: 'list',
      message: `Select the desired word cloud input source format. Pick an action:`,
      choices: [
        { name: `${chalk.cyan('https://wordart.com/')}`, value: WORD_CLOUD_SERVICE.WORDART_COM },
        { name: `${chalk.cyan('https://wordclouds.com')}`, value: WORD_CLOUD_SERVICE.WORDCLOUDS_COM },
      ],
    },
  ])

  return wordCloudService
}

async function saveWordCloudsComSource(terms) {
  const freqAndTerms = terms
    .map((term) => {
      return `${term.freq} ${term.term}`
    })
    .join('\n')

  const targetDir = path.resolve(process.cwd(), 'topic-word-for-wordclouds.com.txt')

  if (fs.existsSync(targetDir)) {
    await fs.remove(targetDir)
  }

  try {
    saveFile(targetDir, freqAndTerms)
  } catch (e) {
    error(`\nsave word file for wordclouds.com failure`)
    error(e)
    exit(1)
  }

  return targetDir
}

async function saveWordArtComSource(terms) {
  const words = terms
    .map((term) => {
      return _.range(term.freq)
        .map(() => term.term)
        .join(' ')
    })
    .join(' ')

  const targetDir = path.resolve(process.cwd(), 'topic-word-for-wordart.com.txt')

  if (fs.existsSync(targetDir)) {
    await fs.remove(targetDir)
  }

  try {
    saveFile(targetDir, words)
  } catch (e) {
    error(`\nsave word file for wordart.com failure`)
    error(e)
    exit(1)
  }
  return targetDir
}
// @ref terms format (natural npm package)
// {
//   term: 'term',
//   tf: 'tf',
//   idf: 'idf',
//   tfidf: 'tdidf'
// }
async function saveWordCloudSource(terms) {
  const wordCloudService = await stepChoiceWordCloudService()

  if (wordCloudService === WORD_CLOUD_SERVICE.WORDART_COM) {
    return await saveWordArtComSource(terms)
  } else if (wordCloudService === WORD_CLOUD_SERVICE.WORDCLOUDS_COM) {
    return await saveWordCloudsComSource(terms)
  }
}

module.exports = {
  saveWordCloudSource,
}

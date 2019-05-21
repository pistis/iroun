const { logWithSpinner, stopSpinner } = require('../helper/spinner')
const { extractWord } = require('./extract')

async function analyzeWord(sourceDirectory) {
  return await extractWord(sourceDirectory)
}

module.exports = async (sourceDirectory) => {
  logWithSpinner(`extract word from ${sourceDirectory}`)

  const result = await analyzeWord(sourceDirectory)
  stopSpinner(true)
  logWithSpinner(`topic word`)
  stopSpinner(true)
}

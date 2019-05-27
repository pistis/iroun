const prepare = require('./prepare')
const analyze = require('./analyze')
const { exit } = require('../helper/utils')
const { log, error } = require('../helper/logger')

module.exports = async (...args) => {
  let sourceDirectory
  try {
    sourceDirectory = await prepare(...args)
  } catch (e) {
    error(e)
    exit(1)
  }

  const terms = await analyze(sourceDirectory)
}

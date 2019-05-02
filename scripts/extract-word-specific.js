const { makeWordFile } = require('./extract-word')

const path = '../src'
const output = '../database/words/iroun.txt'

makeWordFile(path, output)

const { makeWordFile } = require('./extract-word')

const path = '../src'
const output = '../dataset/words/iroun.txt'

makeWordFile(path, output)

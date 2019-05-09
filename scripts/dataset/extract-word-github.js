/**
 * This script analyzes all the source code that exists in '.resource'.
 * The target of the analysis is the name of the source code.
 * The final output will be a text file for each project in the 'dataset/words/' directory.
 */
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const { resolvePath } = require('../util')
const { makeWordFile } = require('./extract-word')

const resourceDir = resolvePath('../.resources')
const repoList = fs.readdirSync(resourceDir).filter((file) => {
  return fs.statSync(path.join(resourceDir, file)).isDirectory()
})

const repositories = repoList.map((file) => {
  return {
    path: path.join(resourceDir, file),
    output: resolvePath(`../dataset/words/${file}.txt`),
  }
})

repositories.forEach((repo) => {
  makeWordFile(repo.path, repo.output)
})

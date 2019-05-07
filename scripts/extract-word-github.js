// need to excute update-github-repositories.js
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const { resolvePath } = require('./util')
const { makeWordFile } = require('./extract-word')

const resourceDir = resolvePath('../.resources')
const repoList = fs.readdirSync(resourceDir).filter((file) => {
  return fs.statSync(path.join(resourceDir, file)).isDirectory()
})

const repositories = repoList.map((file) => {
  return {
    path: path.join(resourceDir, file),
    output: resolvePath(`../database/words/${file}.txt`),
  }
})

repositories.forEach((repo) => {
  makeWordFile(repo.path, repo.output)
})

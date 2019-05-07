const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const { resolvePath } = require('./util')

const repoFile = resolvePath('./data/top100-stars-github-repo.json')
const repos = JSON.parse(fs.readFileSync(repoFile, 'utf-8'))
console.log(repos.length)

const resourceDir = resolvePath('../.resources')
const fileList = fs.readdirSync(resourceDir).filter((file) => {
  return fs.statSync(path.join(resourceDir, file)).isDirectory()
})

console.log(fileList.length)

const filtered = repos.filter((repo) => {
  return fileList.indexOf(repo.name) === -1
})

console.log(filtered.length)
// console.log(filtered)

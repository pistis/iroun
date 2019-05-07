const fs = require('fs')
const rimraf = require('rimraf')
const mkdirp = require('mkdirp')
const { resolvePath } = require('./util')
const ProgressBar = require('progress')
const spawn = require('child_process').spawn

const repoFile = resolvePath('./data/top100-stars-github-repo.json')
const repos = JSON.parse(fs.readFileSync(repoFile, 'utf-8'))

const progressBar = new ProgressBar('  downloading [:bar] :percent :etas :title', {
  complete: '=',
  incomplete: ' ',
  width: 20,
  total: repos.length + 1,
})

progressBar.tick({ title: 'Start git clone top 100 stars github projects.' })

const cloneRepository = function(repoUrl, targetPath) {
  const git = spawn('git', ['clone', repoUrl, '--progress', targetPath])
  git.on('close', function(status) {
    const title = status == 0 ? repoUrl : `git clone failed [${repoUrl}] with status ${status}`
    progressBar.tick({ title: title })
  })
}

const cloneRepositories = async function() {
  repos.forEach((repo) => {
    cloneRepository(repo.clone_url, resolvePath(`../.resources/${repo.name}`))
  })
}

const progressTimer = setInterval(() => {
  if (progressBar.complete) {
    console.log('\n*** Completed Clone top100 stars github repositories.***\n')
    clearInterval(progressTimer)
  }
}, 100)

// rimraf(resolvePath('../.resources'), function(result) {
//   mkdirp(resolvePath('../.resources'), function(err) {
//     if (err) console.error(err)
//     else {
//       cloneRepositories()
//     }
//   })
// })

cloneRepositories()

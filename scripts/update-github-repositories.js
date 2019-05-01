// https://github.com/huchenme/github-trending-api#trending-repositories
const spawn = require('child_process').spawn
const { resolvePath } = require('./util')
const Ora = require('ora')
const rimraf = require('rimraf')
const mkdirp = require('mkdirp')

// https://github.com/collections/front-end-javascript-frameworks
const javascriptFrameworks = [
  { url: 'https://github.com/marko-js/marko', name: 'marko' },
  { url: 'https://github.com/MithrilJS/mithril.js', name: 'mithril.js' },
  { url: 'https://github.com/angular/angular', name: 'angular' },
  { url: 'https://github.com/emberjs/ember.js', name: 'ember.js' },
  { url: 'https://github.com/knockout/knockout', name: 'knockout' },
  { url: 'https://github.com/tastejs/todomvc', name: 'todomvc' },
  { url: 'https://github.com/spine/spine', name: 'spine' },
  { url: 'https://github.com/vuejs/vue', name: 'vue' },
  { url: 'https://github.com/Polymer/polymer', name: 'polymer' },
  { url: 'https://github.com/facebook/react', name: 'react' },
  { url: 'https://github.com/matreshkajs/matreshka', name: 'matreshka' },
  { url: 'https://github.com/aurelia/framework', name: 'framework' },
  { url: 'https://github.com/optimizely/nuclear-js', name: 'nuclear-js' },
  { url: 'https://github.com/jashkenas/backbone', name: 'backbone' },
  { url: 'https://github.com/dojo/dojo', name: 'dojo' },
  { url: 'https://github.com/jorgebucaran/hyperapp', name: 'hyperapp' },
  { url: 'https://github.com/riot/riot', name: 'riot' },
  { url: 'https://github.com/Daemonite/material', name: 'material' },
  { url: 'https://github.com/Polymer/lit-element', name: 'lit-element' },
  { url: 'https://github.com/aurelia/aurelia', name: 'aurelia' },
  { url: 'https://github.com/sveltejs/svelte', name: 'svelte' },
]

const cloneRepository = function(repoUrl, targetPath) {
  return new Promise((resolve, reject) => {
    var process = spawn('git', ['clone', repoUrl, targetPath])
    process.on('close', function(status) {
      if (status == 0) {
        resolve(targetPath)
      } else {
        reject(new Error("'git clone' failed with status " + status))
      }
    })
  })
}

const updateGithubRepositories = async function() {
  const spinner = new Ora({
    text: 'Update Github Repositories(Javascript)',
    spinner: 'moon',
  })
  spinner.start()
  await (async () => {
    spinner.text = 'Updating Github Repositories(Javascript)'
  })()

  const asyncTasks = javascriptFrameworks.map((repo) => {
    return cloneRepository(repo.url, resolvePath(`../.resources/${repo.name}`))
  })
  const results = await Promise.all(asyncTasks)
  console.log(results)
  spinner.succeed()
}

// updateGithubRepositories()
rimraf(resolvePath('../.resources'), function(result) {
  mkdirp(resolvePath('../.resources'), function(err) {
    if (err) console.error(err)
    else {
      updateGithubRepositories()
    }
  })
})

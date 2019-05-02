const { makeWordFile } = require('./extract-word')

const repositories = [
  {
    path:
      '../.resources/react/packages/react/src',
    output: '../database/words/react.txt',
  },
  {
    path:
      '../.resources/react/packages/react-dom/src',
    output:
      '../database/words/react-dom.txt',
  },
  {
    path:
      '../.resources/react/packages/react-events/src',
    output:
      '../database/words/react-events.txt',
  },
  {
    path: '../.resources/vue/src',
    output: '../database/words/vue.txt',
  },
  {
    path: '../.resources/svelte/src',
    output: '../database/words/svelte.txt',
  },
  {
    path: '../.resources/riot/lib',
    output: '../database/words/riot.txt',
  },
  {
    path: '../.resources/polymer/lib',
    output: '../database/words/polymer.txt',
  },
  {
    path: '../.resources/nuclear-js/src',
    output:
      '../database/words/nuclear-js.txt',
  },
  {
    path: '../.resources/matreshka/src',
    output:
      '../database/words/matreshka.txt',
  },
  {
    path: '../.resources/marko/src',
    output: '../database/words/marko.txt',
  },
  {
    path: '../.resources/knockout/src',
    output: '../database/words/knockout.txt',
  },
]

repositories.forEach((repo) => {
  makeWordFile(repo.path, repo.output)
})

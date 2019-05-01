const { makeWordFile } = require('./extract-word')

const repositories = [
  {
    path:
      '/Users/user/Desktop/dev/private/iroun/.resources/react/packages/react/src',
    output: '/Users/user/Desktop/dev/private/iroun/database/words/react.txt',
  },
  {
    path:
      '/Users/user/Desktop/dev/private/iroun/.resources/react/packages/react-dom/src',
    output:
      '/Users/user/Desktop/dev/private/iroun/database/words/react-dom.txt',
  },
  {
    path:
      '/Users/user/Desktop/dev/private/iroun/.resources/react/packages/react-events/src',
    output:
      '/Users/user/Desktop/dev/private/iroun/database/words/react-events.txt',
  },
  {
    path: '/Users/user/Desktop/dev/private/iroun/.resources/vue/src',
    output: '/Users/user/Desktop/dev/private/iroun/database/words/vue.txt',
  },
  {
    path: '/Users/user/Desktop/dev/private/iroun/.resources/svelte/src',
    output: '/Users/user/Desktop/dev/private/iroun/database/words/svelte.txt',
  },
  {
    path: '/Users/user/Desktop/dev/private/iroun/.resources/riot/lib',
    output: '/Users/user/Desktop/dev/private/iroun/database/words/riot.txt',
  },
  {
    path: '/Users/user/Desktop/dev/private/iroun/.resources/polymer/lib',
    output: '/Users/user/Desktop/dev/private/iroun/database/words/polymer.txt',
  },
  {
    path: '/Users/user/Desktop/dev/private/iroun/.resources/nuclear-js/src',
    output:
      '/Users/user/Desktop/dev/private/iroun/database/words/nuclear-js.txt',
  },
  {
    path: '/Users/user/Desktop/dev/private/iroun/.resources/matreshka/src',
    output:
      '/Users/user/Desktop/dev/private/iroun/database/words/matreshka.txt',
  },
  {
    path: '/Users/user/Desktop/dev/private/iroun/.resources/marko/src',
    output: '/Users/user/Desktop/dev/private/iroun/database/words/marko.txt',
  },
  {
    path: '/Users/user/Desktop/dev/private/iroun/.resources/knockout/src',
    output: '/Users/user/Desktop/dev/private/iroun/database/words/knockout.txt',
  },
]

repositories.forEach((repo) => {
  makeWordFile(repo.path, repo.output)
})

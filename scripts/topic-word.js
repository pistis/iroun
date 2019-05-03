const fs = require('fs')
const natural = require('natural')
const _ = require('lodash')
const { resolvePath, saveFile } = require('./util')

const TfIdf = natural.TfIdf
const tfidf = new TfIdf()

const sources = [
  {
    name: 'iroun',
    input: '../database/words/iroun.txt',
    output: '../database/topic-words/iroun.txt',
  },
  {
    name: 'knockout',
    input: '../database/words/knockout.txt',
    output: '../database/topic-words/knockout.txt',
  },
  {
    name: 'marko',
    input: '../database/words/marko.txt',
    output: '../database/topic-words/marko.txt',
  },
  {
    name: 'matreshka',
    input: '../database/words/matreshka.txt',
    output: '../database/topic-words/matreshka.txt',
  },
  {
    name: 'nuclear-js',
    input: '../database/words/nuclear-js.txt',
    output: '../database/topic-words/nuclear-js.txt',
  },
  {
    name: 'polymer',
    input: '../database/words/polymer.txt',
    output: '../database/topic-words/polymer.txt',
  },
  {
    name: 'react-dom',
    input: '../database/words/react-dom.txt',
    output: '../database/topic-words/react-dom.txt',
  },
  {
    name: 'react-events',
    input: '../database/words/react-events.txt',
    output: '../database/topic-words/react-events.txt',
  },
  {
    name: 'react',
    input: '../database/words/react.txt',
    output: '../database/topic-words/react.txt',
  },
  {
    name: 'riot',
    input: '../database/words/riot.txt',
    output: '../database/topic-words/riot.txt',
  },
  {
    name: 'svelte',
    input: '../database/words/svelte.txt',
    output: '../database/topic-words/svelte.txt',
  },
  {
    name: 'vue',
    input: '../database/words/vue.txt',
    output: '../database/topic-words/vue.txt',
  },
]

sources.forEach((source, i) => {
  tfidf.addFileSync(resolvePath(source.input), 'utf8', source.name)
  saveFile(
    resolvePath(source.output),
    tfidf
      .listTerms(i)
      .map((term) => term.term)
      .join('\n')
  )
})

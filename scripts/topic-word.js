/**
TF (term frequency)
- Definition: The frequency of occurrence of the word in the document.

DF (document frequency)
- Definition: Number of documents with words / Total number of documents

Inverse document frequency (IDF)
- Definition: The total number of documents / the number of documents containing the word
- Calculation: Log calculation for scale adjustment (natural TF-IDF logic)
   - 1 + log (total number of documents / 1 + number of documents containing word)
     - ** If the number of documents containing a word is less than 1, IDF becomes Infinity -> 0.
     - Large value: less in other documents
     - Small values: many appear in other documents

TF-IDF (Term frequency Inverse document frequency)
Definition: TF * IDF
Calculation
- Large value: Characteristic words of the document
- Small value: a word that is not characteristic of the document
 */
// need to execute extract-word-github.js, extract-word-iroun.js
const natural = require('natural')
const _ = require('lodash')
const { resolvePath, saveFile } = require('./util')
const { getPOS } = require('../src/pos')
const { filter } = require('p-iteration')

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
  {
    name: 'angular-core',
    input: '../database/words/angular-core.txt',
    output: '../database/topic-words/angular-core.txt',
  },
]

async function taggingNounPos(terms) {
  const filteredTerms = await filter(terms, async (term) => {
    const pos = await getPOS([term.term])
    return pos.nouns.length === 1
  })

  return filteredTerms
}

async function genWordsWithWeight() {
  console.time('calculate TF-IDF')
  sources.forEach((source, i) => {
    tfidf.addFileSync(resolvePath(source.input), 'utf8', source.name)
  })

  sources.forEach(async (source, i) => {
    let terms = tfidf.listTerms(i)

    terms = await taggingNounPos(terms)

    const termsWithWeight = terms.map((term) => {
      return `${parseInt(term.tfidf * 10)} ${term.term}`
    })

    saveFile(resolvePath(source.output), termsWithWeight.join('\n'))
  })
  console.timeEnd('calculate TF-IDF')
}

genWordsWithWeight()

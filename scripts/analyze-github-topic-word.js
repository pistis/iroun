/**
 * This script creates a topic word dataset.
 * 1. Use a dataset of all the word files used in the name of the project source code created with 'extract-word-github.js'.
 * 2. Apply the TF-IDF text mining technique to score the most characteristic words in each project.
 * 
 * A text file is created for each project in the 'dataset / topic-words' directory.
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

const fs = require('fs')
const path = require('path')
const natural = require('natural')
const _ = require('lodash')
const { resolvePath, saveFile } = require('./util')
const { getPOS } = require('../src/pos')
const { filter } = require('p-iteration')

const TfIdf = natural.TfIdf
const tfidf = new TfIdf()

const wordsDir = resolvePath('../dataset/words')
const wordsFiles = fs.readdirSync(wordsDir).filter((file) => {
  return fs.statSync(path.join(wordsDir, file)).isFile()
})

const sources = wordsFiles
  .filter((file) => file.match(/.txt$/g))
  .map((file) => {
    const subject = file.substr(0, file.indexOf('.txt'))
    return {
      name: subject,
      input: path.join(wordsDir, file),
      output: resolvePath(`../dataset/topic-words/${subject}.txt`),
    }
  })

async function taggingNounPos(terms) {
  const filteredTerms = await filter(terms, async (term) => {
    const pos = await getPOS([term.term])
    return pos.nouns.length === 1
  })

  return filteredTerms
}

async function genWordsWithWeight() {
  console.time('calculate topic words using TF-IDF')
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
  console.timeEnd('calculate topic words using TF-IDF')
}

genWordsWithWeight()

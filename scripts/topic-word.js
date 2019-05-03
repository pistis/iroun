const fs = require('fs')
const natural = require('natural')
const _ = require('lodash')
const { resolvePath, saveFile } = require('./util')

const TfIdf = natural.TfIdf
const tfidf = new TfIdf()

// tfidf.addDocument('this document is about node.')
// tfidf.addDocument('this document is about ruby.')
// tfidf.addDocument('this document is about ruby and node.')
// tfidf.addDocument('this document is about node. it has node examples')

// console.log('node --------------------------------')
// tfidf.tfidfs('node', function(i, measure) {
//   console.log('document #' + i + ' is ' + measure)
// })

// console.log('ruby --------------------------------')
// tfidf.tfidfs('ruby', function(i, measure) {
//   console.log('document #' + i + ' is ' + measure)
// })

// must be included source document, because calc TF
tfidf.addFileSync(resolvePath('../database/words/iroun.txt'))
tfidf.addFileSync(resolvePath('../database/words/knockout.txt'))
tfidf.addFileSync(resolvePath('../database/words/marko.txt'))
tfidf.addFileSync(resolvePath('../database/words/matreshka.txt'))
tfidf.addFileSync(resolvePath('../database/words/nuclear-js.txt'))
tfidf.addFileSync(resolvePath('../database/words/polymer.txt'))
tfidf.addFileSync(resolvePath('../database/words/react-dom.txt'))
tfidf.addFileSync(resolvePath('../database/words/react-events.txt'))
tfidf.addFileSync(resolvePath('../database/words/react.txt'))
tfidf.addFileSync(resolvePath('../database/words/riot.txt'))
tfidf.addFileSync(resolvePath('../database/words/svelte.txt'))
tfidf.addFileSync(resolvePath('../database/words/vue.txt'))

const source = resolvePath('../database/words/vue.txt')
const words = fs.readFileSync(source, 'utf-8').split(' ')

let wordMap = {}
words.forEach((word) => {
  word = word.toLowerCase() // remove dup word
  wordMap[word] = {
    word: word,
    freq: ((wordMap[word] && wordMap[word]['freq']) || 0) + 1,
  }
})

console.log(`total word count is ${Object.keys(wordMap).length}`)
const topRankLimit = parseInt(Object.keys(wordMap).length * 0.25)
// extract top rank by limit
let topWords = _.map(wordMap, (value, key) => {
  return {
    word: value['word'],
    freq: value['freq'],
  }
})
topWords = topWords.sort((a, b) => {
  return b['freq'] - a['freq']
})

topWords = topWords.slice(0, topRankLimit)
console.log(`Top ranks word count is ${topWords.length}`)

// revise wordmap
wordMap = {}
_.forEach(topWords, (word) => {
  wordMap[word.word] = {
    word: word.word,
    freq: word.freq,
  }
})

_.forEach(wordMap, (value, key) => {
  tfidf.tfidfs(key, function(i, measure) {
    let tmpWord = wordMap[key]
    tmpWord['tfidf'] = (tmpWord['tfidf'] || 0) + measure
  })
})

let topicWord = _.map(wordMap, (value, key) => {
  return {
    word: value['word'],
    tfidf: value['tfidf'],
  }
})
topicWord = topicWord.sort((a, b) => {
  return a['tfidf'] - b['tfidf']
})
console.log(topicWord)
topicWord = topicWord.map((word, i) => {
  return `${topicWord.length - i} ${word.word}`
})
saveFile(resolvePath('./topic.txt'), topicWord.join('\n'))

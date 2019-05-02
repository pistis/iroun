const fs = require('fs')
const natural = require('natural')
const _ = require('lodash')
const { resolvePath } = require('./util')

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

const wordMap = {}
words.forEach((word) => {
  wordMap[word] = {
    word: word,
    freq: ((wordMap[word] && wordMap[word]['freq']) || 0) + 1,
  }
})

// word freq map
// console.log(wordMap)
// const rankLimit = 10
// const highFreqWordMap = _.map(wordMap, (value, key) => {
//   console.log(value, key)
//   if (value['']) return value
// })
_.forEach(wordMap, (value, key) => {
  tfidf.tfidfs(key, function(i, measure) {
    let tmpWord = wordMap[key]
    tmpWord['tfidf'] = (tmpWord['tfidf'] || 0) + measure
    // console.log('document #' + i + ' is ' + measure)
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

// _.forEach(wordMap, (value, key) => {
//   console.log(value)
// })
// for (let word of wordMap) {
//   // console.log(JSON.stringify(word, null, 2))
//   tfidf.tfidfs(word[0], function(i, measure) {
//     let tmpWord = wordMap.get(word[0])
//     tmpWord['tfidf'] = (tmpWord['tfidf'] || 0) + measure
//     // console.log('document #' + i + ' is ' + measure)
//   })
// }

// console.log(wordMap)

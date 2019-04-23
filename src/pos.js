// POS : part-of-speech
const WordPOS = require('wordpos')
const wordpos = new WordPOS()

const _lookup = async function(word) {
  return new Promise((resolve, reject) => {
    wordpos.lookup(word, function(pos, word) {
      // If there are various parts of speech, only the first lookup result is used.
      const lexName = pos.length > 0 ? pos[0].lexName : ''
      const part = lexName.split('.')
      resolve({ word, part: part[0] })
    })
  })
}

const lookup = async function(words) {
  try {
    return await Promise.all(words.map((word) => _lookup(word)))
  } catch (e) {
    throw e
  }
}

module.exports = {
  lookup,
}

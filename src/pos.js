// POS : part-of-speech
const WordPOS = require('wordpos')
const wordpos = new WordPOS()

const getPOS = async function(words) {
  return await wordpos.getPOS(words)
}

module.exports = {
  getPOS,
}

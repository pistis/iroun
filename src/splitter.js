const makeWordList = function(tokens) {
  const words = []
  let word = ''
  tokens.forEach((token) => {
    let code = token.charCodeAt(0)

    if (code >= 65 && code <= 90 && token.length === 1) {
      word += token
    } else {
      words.push(token)
      if (word.length > 0) {
        words.push(word)
        word = ''
      }
    }
  })

  if (word.length > 0) {
    words.push(word)
    word = ''
  }

  return words
}
const splitCamelCase = function(name) {
  const tokens = name
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ')

  return makeWordList(tokens)
}

const splitPascalCase = function(name) {
  const tokens = name
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ')

  return makeWordList(tokens)
}

const splitSnakeCase = function(name) {
  const tokens = name
    .replace(/([_])/g, ' ')
    .trim()
    .split(' ')

  return makeWordList(tokens)
}

const split = function(name) {
  if (!name) return []
  if (name.indexOf('_') !== -1) {
    return splitSnakeCase(name)
  } else if (/^[a-z]/.test(name)) {
    return splitCamelCase(name)
  } else if (/^[A-Z]/.test(name)) {
    return splitPascalCase(name)
  }
  return []
}

module.exports = {
  split,
  splitCamelCase,
  splitSnakeCase,
  splitPascalCase,
}

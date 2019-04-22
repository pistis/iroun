/**
 * Split the name by word.
 * PascalCase
 * camelCase
 * snake_case
 * time complexity : O(n)
 */
const split = function(name) {
  let len = name.length
  let word = ''
  let list = []
  let combine = false

  for (let i = 0; i < len; i++) {
    let char = name[i]
    let code = char.charCodeAt(0)

    if (code >= 97 && code <= 122) {
      combine = true
    } else if (code >= 65 && code <= 90) {
      combine = false
    }

    if (combine) {
      word += char
    } else {
      if (word.length > 0) {
        list.push(word)
      }
      word = char
    }
  }
  if (word.length > 0) {
    list.push(word)
  }
  return list
}

module.exports = {
  split,
}

const walk = require('acorn-walk')

const extractAttributename = function (ast) {
  const names = new Map()

  walk.simple(ast, {
    AssignmentExpression(node, state) {
      const { left } = node
      if (left.type !== 'MemberExpression') return
      const { type, name } = left.property
      if (type === 'Identifier') {
        if (names.has(name)) {
          names.set(name, names.get(name) + 1)
        } else {
          names.set(name, 1)
        }
      }
    }
  })

  return names
}

module.exports = extractAttributename

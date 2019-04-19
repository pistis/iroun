const walk = require('acorn-walk')

const extractParametername = function (ast) {
  const names = new Map()
  const setName = (name) => {
    if (names.has(name)) {
      names.set(name, names.get(name) + 1)
    } else {
      names.set(name, 1)
    }
  }
  walk.simple(ast, {
    FunctionDeclaration(node, state) {
      const { params } = node
      if (!params || params.length === 0) return

      params.forEach((param) => {
        if (param.type === 'Identifier') {
          setName(param.name)
        } else if (param.type === 'AssignmentPattern') {
          if (param.left && param.left.type === 'Identifier') {
            setName(param.left.name)
          }
        }
      })
    },
    ArrowFunctionExpression(node, state) {
      const { params } = node
      if (!params || params.length === 0) return

      params.forEach((param) => {
        if (param.type === 'Identifier') {
          setName(param.name)
        } else if (param.type === 'AssignmentPattern') {
          if (param.left && param.left.type === 'Identifier') {
            setName(param.left.name)
          }
        }
      })
    }
  })

  return names
}

module.exports = extractParametername

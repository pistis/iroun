const walk = require('acorn-walk')

const extractArgumentsname = function (ast) {
  const names = new Map()
  const setName = (name) => {
    if (names.has(name)) {
      names.set(name, names.get(name) + 1)
    } else {
      names.set(name, 1)
    }
  }
  walk.simple(ast, {
    CallExpression(node, state) {
      const { arguments } = node
      if (!arguments || arguments.length === 0) return

      arguments.forEach((param) => {
        if (param.type === 'Identifier') {
          setName(param.name)
        } // TODO : MemberExpression 인경우( window.Vue 와 같이 넘길경우 처리 필요)
      })
    }
  })

  return names
}

module.exports = extractArgumentsname

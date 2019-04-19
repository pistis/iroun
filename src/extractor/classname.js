// TODO : new 로 호출되는 것도 Class로 취급? NewExpression, 단, 취급한다면 reserved word(built in 요소들)은 제거해야 한다.
const walk = require('acorn-walk')

const extractClassname = function (ast) {
  const names = new Map()

  walk.simple(ast, {
    ClassDeclaration(node, state) {
      const { type, name } = node.id
      if (names.has(name)) {
        names.set(name, names.get(name) + 1)
      } else {
        names.set(name, 1)
      }
    }
  })

  return names
}

module.exports = extractClassname

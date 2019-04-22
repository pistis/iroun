const fs = require('fs')
const acorn = require('acorn')
// const acornLoose = require("acorn-loose");
const walk = require('acorn-walk')

const updateName = function(names, name) {
  names[name] = (names[name] || 0) + 1
}

/**
 * After parsing the javascript file,
 * extract the name and frequency of each type based on AST and return it.
 * TODO
 *  - support flow
 *  - support typescript
 * @param {*} file
 * @returns names map
 result e.g)
 names = {
  classNames: {
    SomeClass: 1
  },
  methodNames: {
    someMethodOne: 1,
    someMethodTwo: 1
  },
  variableNames: {
    someVarOne: 1,
    someVarTwo: 1
  },
  parameterNames: {
    someParamOne: 2,
    someParamTwo: 2
  },
  argumentNames: {
    someArgumentOne: 1,
    someArgumentTwo: 1
  },
  attributeNames: {
    someAttrOne: 1,
    someAttrTwo: 2
  }
}
 */
const extract = function(file) {
  const program = fs.readFileSync(file, 'utf-8')

  const ast = acorn.parse(program, {
    sourceType: 'module',
    ecmaVersion: 9,
  })

  const names = Object.create(null)
  const classNames = Object.create(null)
  const methodNames = Object.create(null)
  const variableNames = Object.create(null)
  const parameterNames = Object.create(null)
  const argumentNames = Object.create(null)
  const attributeNames = Object.create(null)

  names['classNames'] = classNames
  names['methodNames'] = methodNames
  names['variableNames'] = variableNames
  names['parameterNames'] = parameterNames
  names['argumentNames'] = argumentNames
  names['attributeNames'] = attributeNames

  walk.simple(ast, {
    // extract class name
    ClassDeclaration(node, state) {
      const { name } = node.id
      updateName(classNames, name)
    },
    // extract method name
    MethodDefinition(node, state) {
      if (node.kind !== 'method') return
      const { type, name } = node.key
      if (type !== 'Identifier') return
      updateName(methodNames, name)
    },
    // extract method name and parameter name
    // TODO : duplicated logic FunctionDeclaration and ArrowFunctionExpression
    FunctionDeclaration(node, state) {
      if (node.id) {
        const { type, name } = node.id
        if (type === 'Identifier') {
          updateName(methodNames, name)
        }
      }
      const { params } = node
      if (params && params.length > 0) {
        params.forEach((param) => {
          if (param.type === 'Identifier') {
            updateName(parameterNames, param.name)
          } else if (param.type === 'AssignmentPattern') {
            if (param.left && param.left.type === 'Identifier') {
              updateName(parameterNames, param.left.name)
            }
          }
        })
      }
    },
    // extract variable name
    VariableDeclarator(node, state) {
      const { type, name } = node.id
      if (
        type !== 'Identifier' ||
        (node.init && node.init.type.indexOf('Function') !== -1)
      )
        return
      updateName(variableNames, name)
    },
    // extract parameter name
    ArrowFunctionExpression(node, state) {
      const { params } = node
      if (!params || params.length === 0) return

      params.forEach((param) => {
        if (param.type === 'Identifier') {
          updateName(parameterNames, param.name)
        } else if (param.type === 'AssignmentPattern') {
          if (param.left && param.left.type === 'Identifier') {
            updateName(parameterNames, param.left.name)
          }
        }
      })
    },
    // extract argument name
    CallExpression(node, state) {
      if (!node.arguments || node.arguments.length === 0) return

      node.arguments.forEach((param) => {
        if (param.type === 'Identifier') {
          updateName(argumentNames, param.name)
        } // TODO : if is MemberExpression, need to proceed like window.Vue
      })
    },
    // extract attribute name
    // TODO : Class 뿐만 아니라 모든 Object의 attr(property)를 뽑는다.
    AssignmentExpression(node, state) {
      const { left } = node
      if (left.type !== 'MemberExpression') return
      const { type, name } = left.property
      if (type === 'Identifier') {
        updateName(attributeNames, name)
      }
    },
  })

  return names
}

module.exports = {
  extract,
}

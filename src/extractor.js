const fs = require('fs')
const path = require('path')
const acorn = require('acorn')
const flowParser = require('flow-parser')
const typescriptParser = require('@typescript-eslint/parser')
const vueTemplateCompiler = require('vue-template-compiler')
// const acornLoose = require("acorn-loose");
const walk = require('acorn-walk')

const _updateName = function(names, name) {
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
const extract = function(program, scriptType) {
  let ast
  if (scriptType === 'typescript') {
    ast = typescriptParser.parse(program, {
      range: true,
      loc: true,
      tokens: true,
      comment: true,
      useJSXTextNode: true,
      ecmaVersion: 9,
      sourceType: 'module',

      ecmaFeatures: {
        jsx: false,
      },
    })
  } else if (program.indexOf('@flow') !== -1) {
    // facebook/flow
    ast = flowParser.parse(program, {
      esproposal_class_instance_fields: true,
      esproposal_class_static_fields: true,
      esproposal_decorators: true,
      esproposal_export_star_as: true,
      esproposal_optional_chaining: true,
      esproposal_nullish_coalescing: true,
      tokens: false,
      types: true,
    })
  } else {
    ast = acorn.parse(program, {
      sourceType: 'module',
      ecmaVersion: 9,
    })
  }

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

  // for facebook/flow
  const noop = function() {}
  const visitor = walk.make({
    // facebook/flow specific AST Type
    // TODO : this type must be analyze
    ClassProperty: noop,
    DeclareTypeAlias: noop,
    TypeCastExpression: noop,
    TypeAlias: noop,
    InterfaceDeclaration: noop,
    DeclareVariable: noop,
    SpreadProperty: noop,
    OpaqueType: noop,
    // typescript specific AST Type
    TSNonNullExpression: noop,
    TSAbstractMethodDefinition: noop,
    TSEnumDeclaration: noop,
    TSAsExpression: noop,
    TSTypeAliasDeclaration: noop,
    TSInterfaceDeclaration: noop,
    TSParameterProperty: noop,
    TSDeclareFunction: noop,
    TSModuleDeclaration: noop,
    TSIndexSignature: noop,
    TSTypeAssertion: noop,
    TSEmptyBodyFunctionExpression: noop,
  })

  walk.simple(
    ast,
    {
      // extract class name
      ClassDeclaration(node, state) {
        const { name } = node.id
        _updateName(classNames, name)
      },
      // extract method name
      MethodDefinition(node, state) {
        if (node.kind !== 'method') return
        const { type, name } = node.key
        if (type !== 'Identifier') return
        _updateName(methodNames, name)
      },
      // extract method name and parameter name
      // TODO : duplicated logic FunctionDeclaration and ArrowFunctionExpression
      FunctionDeclaration(node, state) {
        if (node.id) {
          const { type, name } = node.id
          if (type === 'Identifier') {
            _updateName(methodNames, name)
          }
        }
        const { params } = node
        if (params && params.length > 0) {
          params.forEach((param) => {
            if (param.type === 'Identifier') {
              _updateName(parameterNames, param.name)
            } else if (param.type === 'AssignmentPattern') {
              if (param.left && param.left.type === 'Identifier') {
                _updateName(parameterNames, param.left.name)
              }
            }
          })
        }
      },
      // extract variable name
      VariableDeclarator(node, state) {
        const { type, name } = node.id
        if (
          type === 'Identifier' &&
          (node.init && node.init.type.indexOf('Function') === -1)
        ) {
          _updateName(variableNames, name)
        } else if (
          type === 'Identifier' &&
          (node.init && node.init.type.indexOf('Function') !== -1)
        ) {
          _updateName(methodNames, name)
        }
      },
      // extract parameter name
      ArrowFunctionExpression(node, state) {
        const { params } = node
        if (!params || params.length === 0) return

        params.forEach((param) => {
          if (param.type === 'Identifier') {
            _updateName(parameterNames, param.name)
          } else if (param.type === 'AssignmentPattern') {
            if (param.left && param.left.type === 'Identifier') {
              _updateName(parameterNames, param.left.name)
            }
          }
        })
      },
      // extract argument name
      CallExpression(node, state) {
        if (!node.arguments || node.arguments.length === 0) return

        node.arguments.forEach((param) => {
          if (param.type === 'Identifier') {
            _updateName(argumentNames, param.name)
          } // TODO : if is MemberExpression, need to proceed like window.Vue
        })
      },
      // extract attribute name
      AssignmentExpression(node, state) {
        const { left } = node
        if (left.type !== 'MemberExpression') return
        const { type, name } = left.property
        if (type === 'Identifier') {
          _updateName(attributeNames, name)
        }
      },
      // attr of object
      Property(node, state) {
        const { key, value } = node
        if (key.type !== 'Identifier') return

        if (value.type.indexOf('Function') !== -1) {
          _updateName(methodNames, key.name)
        } else {
          _updateName(attributeNames, key.name)
        }
      },
      ClassProperty(node, state) {
        const { type, name } = node.key
        if (type !== 'Identifier') return
        const { typeAnnotation } = node
        if (!typeAnnotation) return
        if (!typeAnnotation.typeAnnotation) return
        if (!typeAnnotation.typeAnnotation.id) return
        if (typeAnnotation.typeAnnotation.id.type !== 'Identifier') return

        if (typeAnnotation.typeAnnotation.id.name.indexOf('Function') !== -1) {
          _updateName(methodNames, name)
        } else {
          _updateName(attributeNames, name)
        }
      },
    },
    visitor
  )

  return names
}

// TODO : refactoring parser logic
const extractFromFile = function(file) {
  const program = fs.readFileSync(file, 'utf-8')
  const extname = path.extname(file)
  if (extname === '.vue') {
    const SFCDescriptor = vueTemplateCompiler.parseComponent(program)
    return extract(SFCDescriptor.script.content)
  } else if (extname === '.ts') {
    return extract(program, 'typescript')
  } else if (extname === '.js') {
    return extract(program)
  }
}

module.exports = {
  extract,
  extractFromFile,
}

const fs = require('fs')
const path = require('path')
const { extract, extractFromFile } = require('../../src/extractor')

const resolvePath = (file) => path.resolve(__dirname, file)

describe('extract test', () => {
  test('extractFromFile names 1 depth structure', () => {
    const names = extractFromFile(resolvePath('../data/test-source-code.js'))
    expect(names['classNames']).not.toBe(null)
    expect(names['methodNames']).not.toBe(null)
    expect(names['variableNames']).not.toBe(null)
    expect(names['parameterNames']).not.toBe(null)
    expect(names['argumentNames']).not.toBe(null)
    expect(names['attributeNames']).not.toBe(null)
    expect(Object.keys(names).length).toBe(6)
  })

  test('extract names 1 depth structure', () => {
    const program = fs.readFileSync(
      resolvePath('../data/test-source-code.js'),
      'utf-8'
    )
    const names = extract(program)
    expect(names['classNames']).not.toBe(null)
    expect(names['methodNames']).not.toBe(null)
    expect(names['variableNames']).not.toBe(null)
    expect(names['parameterNames']).not.toBe(null)
    expect(names['argumentNames']).not.toBe(null)
    expect(names['attributeNames']).not.toBe(null)
    expect(Object.keys(names).length).toBe(6)
  })
})

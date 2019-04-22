const { extract } = require('../../src/extractor')
const path = require('path')

const resolvePath = (file) => path.resolve(__dirname, file)

describe('extract test', () => {
  test('names 1 depth structure', () => {
    const names = extract(resolvePath('../data/test-source-code.js'))
    expect(names['classNames']).not.toBe(null)
    expect(names['methodNames']).not.toBe(null)
    expect(names['variableNames']).not.toBe(null)
    expect(names['parameterNames']).not.toBe(null)
    expect(names['argumentNames']).not.toBe(null)
    expect(names['attributeNames']).not.toBe(null)
    expect(Object.keys(names).length).toBe(6)
  })
})

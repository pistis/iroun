const { split } = require('../../src/splitter.js')

describe('split test', () => {
  describe('camel case', () => {
    test('2 words', () => {
      const wordList = split('camelCase')
      expect(wordList.length).toBe(2)
      expect(wordList).toContain('camel')
      expect(wordList).toContain('Case')
    })

    test('3 words', () => {
      const wordList = split('camelCaseTest')
      expect(wordList.length).toBe(3)
      expect(wordList).toContain('camel')
      expect(wordList).toContain('Case')
      expect(wordList).toContain('Test')
    })

    test('4 words', () => {
      const wordList = split('camelCaseTestCases')
      expect(wordList.length).toBe(4)
      expect(wordList).toContain('camel')
      expect(wordList).toContain('Case')
      expect(wordList).toContain('Test')
      expect(wordList).toContain('Cases')
    })
  })
  describe('pascal case', () => {
    test('2 words', () => {
      const wordList = split('PascalCase')
      expect(wordList.length).toBe(2)
      expect(wordList).toContain('Pascal')
      expect(wordList).toContain('Case')
    })

    test('3 words', () => {
      const wordList = split('PascalCaseTest')
      expect(wordList.length).toBe(3)
      expect(wordList).toContain('Pascal')
      expect(wordList).toContain('Case')
      expect(wordList).toContain('Test')
    })

    test('4 words', () => {
      const wordList = split('PascalCaseTestCases')
      expect(wordList.length).toBe(4)
      expect(wordList).toContain('Pascal')
      expect(wordList).toContain('Case')
      expect(wordList).toContain('Test')
      expect(wordList).toContain('Cases')
    })
  })
})

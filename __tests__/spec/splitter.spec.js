const {
  split,
  splitCamelCase,
  splitSnakeCase,
  splitPascalCase,
} = require('../../src/splitter.js')

describe('split test', () => {
  // complex cases
  describe('split test', () => {
    test('camel case', () => {
      const words = split('camelCase')
      expect(words.length).toBe(2)
      expect(words).toContain('camel')
      expect(words).toContain('Case')
    })
    test('pascal case', () => {
      const words = split('PascalCase')
      expect(words.length).toBe(2)
      expect(words).toContain('Pascal')
      expect(words).toContain('Case')
    })
    test('snake case', () => {
      const words = split('snake_case')
      expect(words.length).toBe(2)
      expect(words).toContain('snake')
      expect(words).toContain('case')
    })
  })
  // camelCase
  describe('splitCamelCase test', () => {
    test('2 words', () => {
      const words = splitCamelCase('camelCase')
      expect(words.length).toBe(2)
      expect(words).toContain('camel')
      expect(words).toContain('Case')
    })

    test('3 words', () => {
      const words = splitCamelCase('camelCaseTest')
      expect(words.length).toBe(3)
      expect(words).toContain('camel')
      expect(words).toContain('Case')
      expect(words).toContain('Test')
    })

    test('4 words', () => {
      const words = splitCamelCase('camelCaseTestCases')
      expect(words.length).toBe(4)
      expect(words).toContain('camel')
      expect(words).toContain('Case')
      expect(words).toContain('Test')
      expect(words).toContain('Cases')
    })

    test('5 words and two over Upper case', () => {
      const words = splitCamelCase('camelCaseTestCasesAABBCC')
      expect(words.length).toBe(5)
      expect(words).toContain('camel')
      expect(words).toContain('Case')
      expect(words).toContain('Test')
      expect(words).toContain('Cases')
      expect(words).toContain('AABBCC')
    })
    test('3 words and two over Upper case', () => {
      const words = splitCamelCase('camelAACase')
      expect(words.length).toBe(3)
      expect(words).toContain('camel')
      expect(words).toContain('AA')
      expect(words).toContain('Case')
    })
    test('complex case', () => {
      // can't split AREU -> ARE and U
      const words = splitCamelCase('thisIsAPainWhatAREUDoingNow')
      expect(words.length).toBe(8)
      expect(words).toContain('this')
      expect(words).toContain('Is')
      expect(words).toContain('A')
      expect(words).toContain('Pain')
      expect(words).toContain('What')
      expect(words).toContain('AREU')
      expect(words).toContain('Doing')
      expect(words).toContain('Now')
    })
  })

  // snake_case
  describe('splitSnakeCase test', () => {
    test('2 words', () => {
      const words = splitSnakeCase('snake_case')
      expect(words.length).toBe(2)
      expect(words).toContain('snake')
      expect(words).toContain('case')
    })

    test('3 words', () => {
      const words = splitSnakeCase('snake_case_test')
      expect(words.length).toBe(3)
      expect(words).toContain('snake')
      expect(words).toContain('case')
      expect(words).toContain('test')
    })

    test('4 words', () => {
      const words = splitSnakeCase('snake_test_case_cases')
      expect(words.length).toBe(4)
      expect(words).toContain('snake')
      expect(words).toContain('test')
      expect(words).toContain('case')
      expect(words).toContain('cases')
    })

    test('5 words with Upper case', () => {
      const words = splitSnakeCase('snake_test_cases_UPPER_CASE')
      expect(words.length).toBe(5)
      expect(words).toContain('snake')
      expect(words).toContain('test')
      expect(words).toContain('cases')
      expect(words).toContain('UPPER')
      expect(words).toContain('CASE')
    })
    test('3 words with Upper case', () => {
      const words = splitSnakeCase('snake_AA_case')
      expect(words.length).toBe(3)
      expect(words).toContain('snake')
      expect(words).toContain('AA')
      expect(words).toContain('case')
    })
    test('complex case', () => {
      // can't split AREU -> ARE and U
      const words = splitSnakeCase('this_is_a_pain_What_Are_U_Doing_Now')
      expect(words.length).toBe(9)
      expect(words).toContain('this')
      expect(words).toContain('is')
      expect(words).toContain('a')
      expect(words).toContain('pain')
      expect(words).toContain('What')
      expect(words).toContain('Are')
      expect(words).toContain('U')
      expect(words).toContain('Doing')
      expect(words).toContain('Now')
    })
  })

  // PascalCase
  describe('splitPascalCase test', () => {
    test('2 words', () => {
      const words = splitPascalCase('CamelCase')
      expect(words.length).toBe(2)
      expect(words).toContain('Camel')
      expect(words).toContain('Case')
    })

    test('3 words', () => {
      const words = splitPascalCase('CamelCaseTest')
      expect(words.length).toBe(3)
      expect(words).toContain('Camel')
      expect(words).toContain('Case')
      expect(words).toContain('Test')
    })

    test('4 words', () => {
      const words = splitPascalCase('CamelCaseTestCases')
      expect(words.length).toBe(4)
      expect(words).toContain('Camel')
      expect(words).toContain('Case')
      expect(words).toContain('Test')
      expect(words).toContain('Cases')
    })

    test('5 words and two over Upper case', () => {
      const words = splitPascalCase('CamelCaseTestCasesAABBCC')
      expect(words.length).toBe(5)
      expect(words).toContain('Camel')
      expect(words).toContain('Case')
      expect(words).toContain('Test')
      expect(words).toContain('Cases')
      expect(words).toContain('AABBCC')
    })
    test('3 words and two over Upper case', () => {
      const words = splitPascalCase('CamelAACase')
      expect(words.length).toBe(3)
      expect(words).toContain('Camel')
      expect(words).toContain('AA')
      expect(words).toContain('Case')
    })
    test('complex case', () => {
      // can't split AREU -> ARE and U
      const words = splitPascalCase('ThisIsAPainWhatAREUDoingNow')
      expect(words.length).toBe(8)
      expect(words).toContain('This')
      expect(words).toContain('Is')
      expect(words).toContain('A')
      expect(words).toContain('Pain')
      expect(words).toContain('What')
      expect(words).toContain('AREU')
      expect(words).toContain('Doing')
      expect(words).toContain('Now')
    })
  })
})

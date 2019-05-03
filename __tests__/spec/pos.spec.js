const { getPOS } = require('../../src/pos')

describe('getPOS test', () => {
  test('noun word', async () => {
    expect.assertions(1)
    const pos = await getPOS(['naming', 'analysis'])
    expect(pos.nouns.length).toBe(2)
  })

  test('adjectives word', async () => {
    expect.assertions(1)
    const pos = await getPOS(['beautiful', 'naming'])
    expect(pos.adjectives.length).toBe(2)
  })

  test('adverbs word', async () => {
    expect.assertions(1)
    const pos = await getPOS(['definitely'])
    expect(pos.adverbs.length).toBe(1)
  })

  test('verbs word', async () => {
    expect.assertions(1)
    const pos = await getPOS(['make'])
    expect(pos.verbs.length).toBe(1)
  })

  test('noun & verbs word', async () => {
    expect.assertions(2)
    const pos = await getPOS(['render'])
    expect(pos.nouns.length).toBe(1)
    expect(pos.verbs.length).toBe(1)
  })
})

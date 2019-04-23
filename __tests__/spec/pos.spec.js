const { lookup } = require('../../src/pos')
const path = require('path')

describe('lookup test', () => {
  test('one word', async () => {
    expect.assertions(1)
    const data = await lookup(['apple'])
    expect(data[0].part).toEqual('noun')
  })

  test('multiple words', async () => {
    expect.assertions(10)
    const data = await lookup([
      'extract',
      'split',
      'pos',
      'extractor',
      'splitter',
    ])
    expect(data[0].word).toEqual('extract')
    expect(data[0].part).toEqual('noun')
    expect(data[1].word).toEqual('split')
    expect(data[1].part).toEqual('adj')
    expect(data[2].word).toEqual('pos')
    expect(data[2].part).toEqual('')
    expect(data[3].word).toEqual('extractor')
    expect(data[3].part).toEqual('noun')
    expect(data[4].word).toEqual('splitter')
    expect(data[4].part).toEqual('noun')
  })
})

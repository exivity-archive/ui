import { createMap } from '.'

test('createMap creates a map by keyValue', () => {
  const data = [
    { key: 'first', value: 'ValueOne' },
    { key: 'second', value: 'ValueTwo' },
    { key: 'thirth', value: 'ValueThree' }
  ]

  const map = createMap(data)

  expect(map).toEqual({
    ['first']: data[0],
    ['second']: data[1],
    ['thirth']: data[2]
  })
})

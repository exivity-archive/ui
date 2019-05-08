import { disableEnumerable } from './disableEnumerable'

test('disableEnumerable sets property enumerable to false', () => {
  const obj = { key: '1', test: 'test' }

  disableEnumerable(obj, 'test')

  const newObj = { ...obj }

  expect(newObj.hasOwnProperty('test')).toBe(false)
})

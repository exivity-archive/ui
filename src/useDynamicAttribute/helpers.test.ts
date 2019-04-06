import { makeMap } from './helpers'

test('make map returns a map with key values', () => {
  const data = [{ key: 'first' }, { key: 'second' }, { key: 'third' }]

  const map = makeMap(data, true)
  expect(map).toMatchObject({ first: true, second: true, third: true })
})

test('make map keeps old values if already defined', () => {
  const data = [{ key: 'first' }, { key: 'second' }, { key: 'third' }]
  const oldMap = {
    first: false
  }

  const map = makeMap(data, true, oldMap)
  expect(map).toMatchObject({ first: false, second: true, third: true })
})

test('properties of data items can be used to get initial state', () => {
  const data = [{ key: 'first' }, { key: 'second' }, { key: 'third' }]

  const map = makeMap(data, item => item.key !== 'second')
  expect(map).toMatchObject({ first: true, second: false, third: true })
})

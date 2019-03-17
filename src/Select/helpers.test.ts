import { calculateHeight, getSelectedItem, ITEM_HEIGHT, MAX_HEIGHT, NB_OF_ITEMS } from './helpers'

test(`calculate height should return array length times ${ITEM_HEIGHT}`, () => {
  const arr = new Array(9)

  const height = calculateHeight(arr)
  expect(height).toBe(270)
})

test(`calculate height should not exceed ${MAX_HEIGHT}`, () => {
  const arr = new Array(NB_OF_ITEMS + 1)

  const height = calculateHeight(arr)
  expect(height).toBe(MAX_HEIGHT)
})

test(`getSelectedItem should return selected item`, () => {
  const items = [
    { key: '1', value: 'one' },
    { key: '2', value: 'two' },
    { key: '3', value: 'three' },
    { key: '4', value: 'four' }
  ]

  const item = getSelectedItem('1', items)

  expect(item).toBe(items[0])
})

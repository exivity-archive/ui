import { SelectListData } from './SelectList'

import {
  calculateHeight,
  getNoDataPlaceholder,
  ITEM_HEIGHT,
  MAX_HEIGHT,
  NB_OF_ITEMS,
  NO_DATA_KEY,
  NO_DATA_TEXT
} from './helpers'

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

test(`getNoDataPlaceholder should return a data placeholder when data doesnt have length`, () => {
  const items: SelectListData[] = []

  const placeholder = getNoDataPlaceholder(items)

  expect(placeholder).toEqual([{ key: NO_DATA_KEY, value: NO_DATA_TEXT }])
})

test(`getNoDataPlaceholder should return a custom text`, () => {
  const items: SelectListData[] = []
  const customText = 'this is a custom text'

  const placeholder = getNoDataPlaceholder(items, customText)

  expect(placeholder).toEqual([{ key: NO_DATA_KEY, value: customText }])
})

test(`getNoDataPlaceholder should input data if it has length`, () => {
  const items: SelectListData[] = [
    { key: '1', value: 'one' },
    { key: '2', value: 'two' },
    { key: '3', value: 'three' },
    { key: '4', value: 'four' }
  ]

  const placeholder = getNoDataPlaceholder(items)

  expect(placeholder).toBe(items)
})

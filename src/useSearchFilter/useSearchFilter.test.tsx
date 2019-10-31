import { renderHook } from '@testing-library/react-hooks'

import { useSearchFilter } from './'

const recordOne = { id: 1, value: 'ceo', name: 'tallees' }
const recordTwo = { id: 2, value: 'exivity', name: 'employEEs' }
const recordThree = { id: 3, value: 'cloud', name: 'business' }
const recordFour = { id: 4, value: 'moons', name: 'opera' }

const fakeData = [
  recordOne,
  recordTwo,
  recordThree,
  recordFour
]

test('uses value property by default', () => {
  const { result } = renderHook(() => useSearchFilter(fakeData, 'ceo'))

  const data = result.current

  expect(data).toEqual([recordOne])
})

test('use accessor to use other properties', () => {
  const { result } = renderHook(() => useSearchFilter(
    fakeData,
    'es',
    (item) => item.name)
  )

  const data = result.current

  expect(data).toEqual([recordOne, recordTwo, recordThree])
})

test('Ignore casings of search and item value', () => {
  const { result } = renderHook(() => useSearchFilter(
    fakeData,
    'Es',
    (item) => item.name)
  )

  const data = result.current

  expect(data).toEqual([recordOne, recordTwo, recordThree])
})

test('returns no data when no match', () => {
  const { result } = renderHook(() => useSearchFilter(fakeData, 'blend'))

  const data = result.current

  expect(data).toEqual([])
})

test('returns all data when no searchterm', () => {
  const { result } = renderHook(() => useSearchFilter(fakeData, ''))

  const data = result.current

  expect(data).toEqual([recordOne, recordTwo, recordThree, recordFour])
})

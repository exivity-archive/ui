import { getDistanceFromSibling } from './helpers'

const makeObjectsWithLevelProp = (levels: number[]): { level: number }[] =>
  levels.map((level, i) => ({ level }))

test('should return right value if previous item has even level', () => {
  const data = makeObjectsWithLevelProp([1, 1])
  const dist = getDistanceFromSibling(data, 1)
  expect(dist).toBe(1)
})

test('should return right value if previous item is on another level', () => {
  const data = makeObjectsWithLevelProp([1, 2, 1])
  const dist = getDistanceFromSibling(data, 2)
  expect(dist).toBe(2)
})

test('should return 0 is array is empty', () => {
  const data = makeObjectsWithLevelProp([])
  const dist = getDistanceFromSibling(data, 0)
  expect(dist).toBe(0)
})

test('should return 1 if given index is 0', () => {
  const data = makeObjectsWithLevelProp([1, 2, 1])
  const dist = getDistanceFromSibling(data, 0)
  expect(dist).toBe(1)
})

test('should work with up to 5 levels', () => {
  const data = makeObjectsWithLevelProp([1, 2, 3, 4, 5, 1])
  const dist = getDistanceFromSibling(data, 5)
  expect(dist).toBe(5)
})

test('should work with complicated nesting', () => {
  const data = makeObjectsWithLevelProp([1, 2, 3, 2, 3, 4, 4, 1])
  const dist = getDistanceFromSibling(data, 7)
  expect(dist).toBe(7)
})

test('should work for non root elements', () => {
  const data = makeObjectsWithLevelProp([1, 2, 3, 4, 4, 2])
  const dist = getDistanceFromSibling(data, 5)
  expect(dist).toBe(4)
})

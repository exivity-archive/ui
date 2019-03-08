import { distanceBetweenEvenLevelItem } from './helpers'

interface Data {
  attributes: { level: number }
}

test('should return right value if previous item has even level', () => {
  const data: Data[] = [
    { attributes: { level: 1 } },
    { attributes: { level: 1 } }]
  const dist = distanceBetweenEvenLevelItem(data, 1)
  expect(dist).toBe(1)
})

test('should return right value if previous item is on another level', () => {
  const data: Data[] = [
    { attributes: { level: 1 } },
    { attributes: { level: 2 } },
    { attributes: { level: 1 } }]
  const dist = distanceBetweenEvenLevelItem(data, 2)
  expect(dist).toBe(2)
})

test('should return 0 is array is empty', () => {
  const data: Data[] = []
  const dist = distanceBetweenEvenLevelItem(data, 2)
  expect(dist).toBe(0)
})

test('should return 1 if given index is 0', () => {
  const data: Data[] = [
    { attributes: { level: 1 } },
    { attributes: { level: 2 } },
    { attributes: { level: 1 } }]
  const dist = distanceBetweenEvenLevelItem(data, 0)
  expect(dist).toBe(1)
})

test('should work with up to 5 levels', () => {
  const data: Data[] = [
    { attributes: { level: 1 } },
    { attributes: { level: 2 } },
    { attributes: { level: 3 } },
    { attributes: { level: 4 } },
    { attributes: { level: 5 } },
    { attributes: { level: 1 } }]
  const dist = distanceBetweenEvenLevelItem(data, 5)
  expect(dist).toBe(5)
})

test('should work with complicated nesting', () => {
  const data: Data[] = [
    { attributes: { level: 1 } },
    { attributes: { level: 2 } },
    { attributes: { level: 3 } },
    { attributes: { level: 2 } },
    { attributes: { level: 3 } },
    { attributes: { level: 4 } },
    { attributes: { level: 4 } },
    { attributes: { level: 1 } }]
  const dist = distanceBetweenEvenLevelItem(data, 7)
  expect(dist).toBe(7)
})

test('should work for non root elements', () => {
  const data: Data[] = [
    { attributes: { level: 1 } },
    { attributes: { level: 2 } },
    { attributes: { level: 3 } },
    { attributes: { level: 4 } },
    { attributes: { level: 4 } },
    { attributes: { level: 2 } }]
  const dist = distanceBetweenEvenLevelItem(data, 5)
  expect(dist).toBe(4)
})

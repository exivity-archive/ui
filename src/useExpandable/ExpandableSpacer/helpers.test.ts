import { distanceBetweenEvenLevelItem, makeSpacerLines, SpacerLines } from './helpers'

interface Data {
  attributes: { level: number }
}

test('distanceBetweenEvenLevelItems should return right value if previous item has even level', () => {
  const data: Data[] = [
    { attributes: { level: 1 } },
    { attributes: { level: 1 } }]
  const dist = distanceBetweenEvenLevelItem(data, 1)
  expect(dist).toBe(1)
})

test('distanceBetweenEvenLevelItems should return right value if previous item is on another level', () => {
  const data: Data[] = [
    { attributes: { level: 1 } },
    { attributes: { level: 2 } },
    { attributes: { level: 1 } }]
  const dist = distanceBetweenEvenLevelItem(data, 2)
  expect(dist).toBe(2)
})

test('distanceBetweenEvenLevelItems should return 0 is array is empty', () => {
  const data: Data[] = []
  const dist = distanceBetweenEvenLevelItem(data, 2)
  expect(dist).toBe(0)
})

test('distanceBetweenEvenLevelItems should return 1 if given index is 0', () => {
  const data: Data[] = [
    { attributes: { level: 1 } },
    { attributes: { level: 2 } },
    { attributes: { level: 1 } }]
  const dist = distanceBetweenEvenLevelItem(data, 0)
  expect(dist).toBe(1)
})

test('distanceBetweenEvenLevelItems should work with up to 5 levels', () => {
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

test('distanceBetweenEvenLevelItems should work with complicated nesting', () => {
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

test('distanceBetweenEvenLevelItems should work for non root elements', () => {
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

test('makeSpacerLines should not make spacer lines for top list item', () => {
  const expected: SpacerLines = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
  expect(makeSpacerLines(1, 0, 100)).toMatchObject(expected)
})

test('makeSpacerLines should make left and top lines for level 1 items in the middle of the list ', () => {
  const expected: SpacerLines = {
    top: 1,
    right: 0,
    bottom: 0,
    left: 1
  }
  expect(makeSpacerLines(1, 1, 100)).toMatchObject(expected)
})

test('makeSpacerLines should make left, top and bottom lines for level 1 1 item if it\'s the last one at the bottom ', () => {
  const expected: SpacerLines = {
    top: 1,
    right: 0,
    bottom: 1,
    left: 1
  }
  expect(makeSpacerLines(1, 99, 100)).toMatchObject(expected)
})

test('makeSpacerLines should make right and bottom lines for non level 1 item', () => {
  const expected: SpacerLines = {
    top: 0,
    right: 0,
    bottom: 1,
    left: 1
  }
  expect(makeSpacerLines(2, 4, 100)).toMatchObject(expected)
})

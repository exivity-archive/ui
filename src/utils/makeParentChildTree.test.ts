import { createParentChildrenMap, PARENT, CHILDREN, orderChildrenUnderParents, iterateAllParents, iterateAllChildren } from './makeParentChildTree'

test('createParentChildrenMap creates a map by keys', () => {
  const list = [
    { key: '1', parentId: null },
    { key: '2', parentId: '1' },
    { key: '3', parentId: '2' },
    { key: '4', parentId: '3' }
  ]

  const map = createParentChildrenMap(list, (item) => item.parentId)

  expect(map['1']).toBe(list[0])
  expect(map['2']).toBe(list[1])
  expect(map['3']).toBe(list[2])
  expect(map['4']).toBe(list[3])
})

test('createParentChildrenMap creates a map with a parent reference', () => {
  const list = [
    { key: '1', parentId: null },
    { key: '2', parentId: '1' },
    { key: '3', parentId: '2' },
    { key: '4', parentId: '3' }
  ]

  const map = createParentChildrenMap(list, (item) => item.parentId)

  expect(map['1'][PARENT]).toBe(undefined)
  expect(map['2'][PARENT]).toBe(list[0])
  expect(map['3'][PARENT]).toBe(list[1])
  expect(map['4'][PARENT]).toBe(list[2])
})

test('createParentChildrenMap creates a map with child references', () => {
  const list = [
    { key: '1', parentId: null },
    { key: '2', parentId: '1' },
    { key: '3', parentId: '2' },
    { key: '4', parentId: '3' }
  ]

  const map = createParentChildrenMap(list, (item) => item.parentId)

  expect(map['1'][CHILDREN][0]).toBe(list[1])
  expect(map['2'][CHILDREN][0]).toBe(list[2])
  expect(map['3'][CHILDREN][0]).toBe(list[3])
  expect(map['4'][CHILDREN]).toBe(undefined)
})

test('orderChildrenUnderParents creates a list from a map', () => {
  const list = [
    { key: '1', parentId: null },
    { key: '2', parentId: '1' },
    { key: '3', parentId: '2' },
    { key: '4', parentId: '3' }
  ]

  const map = createParentChildrenMap(list, (item) => item.parentId)

  const items = orderChildrenUnderParents<any>(map)
  expect(items.length).toBe(4)
})

test('orderChildrenUnderParents orders children directly under their parents', () => {
  const list = [
    { key: '1', parentId: null },
    { key: '2', parentId: '3' },
    { key: '3', parentId: '1' },
    { key: '4', parentId: '2' }
  ]

  const map = createParentChildrenMap(list, (item) => item.parentId)

  const items = orderChildrenUnderParents<any>(map)
  expect(items[0].key).toBe('1')
  expect(items[1].key).toBe('3')
  expect(items[2].key).toBe('2')
  expect(items[3].key).toBe('4')
})

test('orderChildrenUnderParents adds a level prop to all items', () => {
  const list = [
    { key: '1', parentId: null },
    { key: '2', parentId: '3' },
    { key: '3', parentId: '1' },
    { key: '4', parentId: '3' }
  ]

  const map = createParentChildrenMap(list, (item) => item.parentId)

  const items = orderChildrenUnderParents<any>(map)

  expect(items[0].level).toBe(1)
  expect(items[1].level).toBe(2)
  expect(items[2].level).toBe(3)
  expect(items[3].level).toBe(3)
})

test(`iterateAllParents iterates recursively over all ${PARENT}`, () => {
  const mock = jest.fn()

  const tree = {
    key: '1',
    [PARENT]: {
      key: '2',
      [PARENT]: {
        key: '3',
        [PARENT]: {
          key: '4'
        }
      }
    }
  }

  iterateAllParents<any>(tree, mock)
  expect(mock).toHaveBeenCalledTimes(3)
})

test(`iterateAllChildren iterates recursively over all ${CHILDREN}`, () => {
  const mock = jest.fn()

  const tree = {
    key: '1',
    [CHILDREN]: [
      {
        key: '2',
        [CHILDREN]: [{ key: '3' }, { key: '4' }]
      }, {
        key: '5',
        [CHILDREN]: [{ key: '6' }, { key: '7' }]
      }
    ]
  }

  iterateAllChildren<any>(tree, mock)
  expect(mock).toHaveBeenCalledTimes(6)
})

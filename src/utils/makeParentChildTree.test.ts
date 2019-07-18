import {
  createParentChildrenMap,
  PARENT,
  CHILDREN,
  orderChildrenUnderParents,
  iterateAllParents,
  iterateAllChildren,
  sortAllChildren
} from './makeParentChildTree'

test('createParentChildrenMap creates a map by keys', () => {
  const list = [
    { key: '1', parentId: null },
    { key: '2', parentId: '1' },
    { key: '3', parentId: '2' },
    { key: '4', parentId: '3' }
  ]

  const map = createParentChildrenMap(list, (item) => item.parentId)

  expect(map['1']).toEqual(expect.objectContaining(list[0]))
  expect(map['2']).toEqual(expect.objectContaining(list[1]))
  expect(map['3']).toEqual(expect.objectContaining(list[2]))
  expect(map['4']).toEqual(expect.objectContaining(list[3]))
})

test('createParentChildrenMap creates a map with a parent reference', () => {
  const list = [
    { key: '1', parentId: null },
    { key: '2', parentId: '1' },
    { key: '3', parentId: '2' },
    { key: '4', parentId: '3' }
  ]

  const map = createParentChildrenMap(list, (item) => item.parentId)

  expect(map['1'][PARENT]).toEqual(undefined)
  expect(map['2'][PARENT]).toEqual(expect.objectContaining(list[0]))
  expect(map['3'][PARENT]).toEqual(expect.objectContaining(list[1]))
  expect(map['4'][PARENT]).toEqual(expect.objectContaining(list[2]))
})

test('createParentChildrenMap creates a map with child reference', () => {
  const list = [
    { key: '1', parentId: null },
    { key: '2', parentId: '1' },
    { key: '3', parentId: '2' },
    { key: '4', parentId: '3' }
  ]

  const map = createParentChildrenMap(list, (item) => item.parentId)

  expect(map['1'][CHILDREN][0]).toEqual(expect.objectContaining(list[1]))
  expect(map['2'][CHILDREN][0]).toEqual(expect.objectContaining(list[2]))
  expect(map['3'][CHILDREN][0]).toEqual(expect.objectContaining(list[3]))
  expect(map['4'][CHILDREN]).toBe(undefined)
})

test('createParentChildrenMap creates a map with copies', () => {
  const list = [
    { key: '1', parentId: null },
    { key: '2', parentId: '1' },
    { key: '3', parentId: '2' },
    { key: '4', parentId: '3' }
  ]

  const map = createParentChildrenMap(list, (item) => item.parentId)

  expect(map['1'][CHILDREN][0]).toEqual(expect.objectContaining(list[1]))
  expect(map['1'][CHILDREN][0]).not.toBe(list[1])
  expect(map['2'][CHILDREN][0]).toEqual(expect.objectContaining(list[2]))
  expect(map['1'][CHILDREN][0]).not.toBe(list[2])
  expect(map['3'][CHILDREN][0]).toEqual(expect.objectContaining(list[3]))
  expect(map['1'][CHILDREN][0]).not.toBe(list[3])
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

test('recursiveSortChildren sorts all children of an item based on the compareFn given', () => {
  const compareFn = (a: any, b: any) => {
    if (a.value > b.value) return 1
    if (b.value > a.value) return -1
    return 0
  }

  const tree = {
    key: '1',
    [CHILDREN]: [
      {
        key: '2',
        value: 2,
        [CHILDREN]: [{ key: '3', value: 2 }, { key: '4', value: 1 }]
      }, {
        key: '5',
        value: 1,
        [CHILDREN]: [{ key: '6', value: 1 }, { key: '7', value: 2 }]
      }
    ]
  }

  sortAllChildren(tree, compareFn)

  const expectedOrder = ['5', '6', '7', '2', '4', '3']
  let i = 0
  iterateAllChildren<any>(tree, (child) => {
    expect(child.key).toBe(expectedOrder[i])
    i++
  })
})

import React from 'react'
import { mount } from 'enzyme'

import {
  CHILDREN,
  createParentChildrenMap,
  enrichTreeItems,
  getVisibleItems,
  hasNoCollapsedParents,
  PARENT,
  orderChildrenUnderParents,
  useExpandable
} from '.'

interface Record {
  key: string
  parentId: string | null
}

const ExpandableList = ({ children, data, accessor, expandedKeys }: any) => {
  return children(useExpandable<Record>(data, accessor, expandedKeys))
}

test('useExpandable without expandedKeys', () => {
  let returnData: Record[] = []

  const list: Record[] = [
    { key: '1', parentId: null },
    { key: '2', parentId: '1' },
    { key: '3', parentId: '2' },
    { key: '4', parentId: '3' }
  ]

  mount(
    <ExpandableList data={list} accessor={(item: any) => item.parentId}>
      {(data: any) => {
        [returnData] = data
        return null
      }}
    </ExpandableList>)

  console.log(returnData)
  expect(returnData.length).toBe(1)
})

test('useExpandable with expandedKeys', () => {
  let returnData: Record[] = []
  const expandedItems = ['1', '2']

  const list = [
    { key: '1', parentId: null },
    { key: '2', parentId: '1' },
    { key: '3', parentId: '2' },
    { key: '4', parentId: '3' }
  ]

  mount(
    <ExpandableList data={list} accessor={(item: any) => item.parentId} expandedKeys={expandedItems}>
      {(data: any) => {
        [returnData] = data
        return null
      }}
    </ExpandableList>)

  expect(returnData.length).toBe(3)
})

test('tree.expand.children(item) will expand entire itemTree', () => {
  let returnData: any[] = []
  let tree: any

  const list = [
    { key: '1', parentId: null },
    { key: '2', parentId: '3' },
    { key: '3', parentId: '1' },
    { key: '4', parentId: '2' }
  ]

  mount(
    <ExpandableList data={list} accessor={(item: any) => item.parentId}>
      {(data: any) => {
        [returnData, tree] = data
        if (returnData.length === 1) {
          expect(returnData.length).toBe(1)
          tree.expand.children('1')
        }

        if (returnData.length !== 1) {
          expect(returnData.length).toBe(4)
        }
        return null
      }}
    </ExpandableList>)
})

// test('useExpandable expanded boolean set to false', () => {
//   let returnData: any[] = []
//
//   const list = [
//     { key: '1', parentId: null },
//     { key: '2', parentId: '3' },
//     { key: '3', parentId: '1' },
//     { key: '4', parentId: '2' }
//   ]
//
//   mount(
//     <ExpandableList data={list} accessor={(item: any) => item.parentId}>
//       {(data: any) => {
//         returnData = data
//         return null
//       }}
//     </ExpandableList>)
//
//   expect(returnData.length).toBe(1)
//   returnData.forEach((item) => {
//     expect(item.expanded).toBe(false)
//   })
// })

// test('useExpandable will not filter items which do no have a parentId', () => {
//   let returnData: any[] = []
//
//   const list = [
//     { key: '1', parentId: null },
//     { key: '2', parentId: '1' },
//     { key: 'grouping' },
//     { key: '3', parentId: '2' },
//     { key: '4', parentId: '3' }
//   ]
//
//   mount(
//     <ExpandableList data={list} accessor={(item: any) => item.parentId} expanded>
//       {(data: any) => {
//         returnData = data
//         return null
//       }}
//     </ExpandableList>)
//
//   expect(returnData.length).toBe(5)
//   expect(returnData[4].key).toBe('grouping')
// })

// test('hasNoCollapsedParents returns true', () => {
//   const one = { key: '1', expanded: true, index: 0 }
//   const two = { key: '2', expanded: true, index: 1, [PARENT]: one }
//   const three = { key: '3', expanded: true, index: 2, [PARENT]: two }
//   const four = { key: '4', index: 3, [PARENT]: three }
//
//   const list = [
//     one,
//     two,
//     three,
//     four
//   ]
//
//   const noneCollapsed = hasNoCollapsedParents<any>(four, list)
//   expect(noneCollapsed).toBe(true)
// })
//
// test('hasNoCollapsedParents returns false', () => {
//   const one = { key: '1', expanded: false, index: 0 }
//   const two = { key: '2', expanded: true, index: 1, [PARENT]: one }
//   const three = { key: '3', expanded: true, index: 2, [PARENT]: two }
//   const four = { key: '4', index: 3, [PARENT]: three }
//
//   const list = [
//     one,
//     two,
//     three,
//     four
//   ]
//
//   const noneCollapsed = hasNoCollapsedParents<any>(four, list)
//   expect(noneCollapsed).toBe(false)
// })
//
// test('getVisibleItems filters items of which all parents are expanded', () => {
//   const one = { key: '1', expanded: true, index: 0 }
//   const two = { key: '2', expanded: false, index: 1, [PARENT]: one }
//   const three = { key: '3', expanded: true, index: 2, [PARENT]: two }
//   const four = { key: '4', index: 3, [PARENT]: three }
//
//   const list = [
//     one,
//     two,
//     three,
//     four
//   ]
//
//   expect(getVisibleItems<any>(list).length).toBe(2)
// })
//
// test('getVisibleItems returns all if all parents are expanded', () => {
//   const one = { key: '1', expanded: true, index: 0 }
//   const two = { key: '2', expanded: true, index: 1, [PARENT]: one }
//   const three = { key: '3', expanded: true, index: 2, [PARENT]: two }
//   const four = { key: '4', index: 3, [PARENT]: three }
//
//   const list = [
//     one,
//     two,
//     three,
//     four
//   ]
//
//   expect(getVisibleItems<any>(list).length).toBe(4)
// })

// test('enrichTreeItems enriches item from list with expand function', () => {
//   const one = { key: '1', expanded: true, index: 0 }
//   const two = { key: '2', expanded: true, index: 1, [PARENT]: one }
//   const three = { key: '3', expanded: true, index: 2, [PARENT]: two }
//   const four = { key: '4', expanded: true, index: 3, [PARENT]: three }
//
//   const expandMock = jest.fn()
//
//   const list = [
//     one,
//     two,
//     three,
//     four
//   ]
//
//   const items = enrichTreeItems<any>(list, expandMock)
//   items.forEach((item) => {
//     item.expand()
//   })
//
//   expect(expandMock).toHaveBeenCalledTimes(4)
// })

// test('Expand mock should return a new copy of the original list', () => {
//   const one = { key: '1', expanded: true, index: 0 }
//   const two = { key: '2', expanded: true, index: 1, [PARENT]: one }
//   const three = { key: '3', expanded: true, index: 2, [PARENT]: two }
//   const four = { key: '4', expanded: true, index: 3, [PARENT]: three }
//
//   const expandMock = jest.fn(result => result)
//
//   const list = [
//     one,
//     two,
//     three,
//     four
//   ]
//
//   const items = enrichTreeItems<any>(list, expandMock)
//   items[0].expand()
//
//   const resultListMock = expandMock.mock.results[0].value
//
//   expect(resultListMock).not.toBe(list)
// })

// test('Expand mock should return a new copy of item which called expand function', () => {
//   const one = { key: '1', expanded: true }
//   const two = { key: '2', expanded: true, [PARENT]: one }
//   const three = { key: '3', expanded: true, [PARENT]: two }
//   const four = { key: '4', expanded: true, [PARENT]: three }
//
//   const expandMock = jest.fn(result => result)
//
//   const list = [
//     one,
//     two,
//     three,
//     four
//   ]
//
//   const items = enrichTreeItems<any>(list, expandMock)
//   items[0].expand()
//
//   const resultListMock = expandMock.mock.results[0].value
//
//   expect(resultListMock).not.toBe(list)
//   expect(resultListMock[0]).not.toBe(list[0])
//   expect(resultListMock[1]).toBe(list[1])
//   expect(resultListMock[2]).toBe(list[2])
//   expect(resultListMock[3]).toBe(list[3])
// })

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

  expect(map['1'][CHILDREN]![0]).toBe(list[1])
  expect(map['2'][CHILDREN]![0]).toBe(list[2])
  expect(map['3'][CHILDREN]![0]).toBe(list[3])
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

  const items = orderChildrenUnderParents<any>(map, true)
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

  const items = orderChildrenUnderParents<any>(map, true)
  expect(items[0].key).toBe('1')
  expect(items[1].key).toBe('3')
  expect(items[2].key).toBe('2')
  expect(items[3].key).toBe('4')
})

// test('orderChildrenUnderParents extends items with expand attribute', () => {
//   const list = [
//     { key: '1', parentId: null },
//     { key: '2', parentId: '3' },
//     { key: '3', parentId: '1' },
//     { key: '4', parentId: '2' }
//   ]
//
//   const map = createParentChildrenMap(list, (item) => item.parentId)
//
//   const itemsTrue = orderChildrenUnderParents<any>(map, true)
//   itemsTrue.forEach((item) => {
//     expect(item.expanded).toBe(true)
//   })
//
//   const itemsFalse = orderChildrenUnderParents<any>(map, false)
//   itemsFalse.forEach((item) => {
//     expect(item.expanded).toBe(false)
//   })
// })

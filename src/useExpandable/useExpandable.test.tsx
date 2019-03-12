import { mount } from 'enzyme'
import React from 'react'

import {
  CHILDREN,
  createParentChildrenMap,
  enrichItems,
  getVisibleItems,
  noCollapsedParents,
  PARENT,
  orderChildrenUnderParents,
  useExpandable
} from '.'

const ExpandableList = ({ children, data, accessor, expanded }: any) => {
  return children(useExpandable<any>(data, accessor, expanded))
}

test('useExpandable with expanded callback', () => {
  let returnData: any[] = []
  const expandedItems = ['1', '2']
  const callback = (item: any) => expandedItems.includes(item.key)

  const list = [
    { key: '1', parentId: null },
    { key: '2', parentId: '1' },
    { key: '3', parentId: '2' },
    { key: '4', parentId: '3' }
  ]

  mount(
    <ExpandableList data={list} accessor={(item: any) => item.parentId} expanded={callback}>
      {(data: any) => {
        returnData = data
        return null
      }}
    </ExpandableList>)

  expect(returnData.length).toBe(3)
  returnData.forEach((item) => {
    if (expandedItems.includes(item.key)) {
      expect(item.expanded).toBe(true)
    } else {
      expect(item.expanded).toBe(false)
    }
  })
})

test('useExpandable expanded boolean set to true', () => {
  let returnData: any[] = []

  const list = [
    { key: '1', parentId: null },
    { key: '2', parentId: '3' },
    { key: '3', parentId: '1' },
    { key: '4', parentId: '2' }
  ]

  mount(
    <ExpandableList data={list} accessor={(item: any) => item.parentId} expanded>
      {(data: any) => {
        returnData = data
        return null
      }}
    </ExpandableList>)

  expect(returnData.length).toBe(4)
  returnData.forEach((item) => {
    expect(item.expanded).toBe(true)
  })
})

test('useExpandable expanded boolean set to false', () => {
  let returnData: any[] = []

  const list = [
    { key: '1', parentId: null },
    { key: '2', parentId: '3' },
    { key: '3', parentId: '1' },
    { key: '4', parentId: '2' }
  ]

  mount(
    <ExpandableList data={list} accessor={(item: any) => item.parentId}>
      {(data: any) => {
        returnData = data
        return null
      }}
    </ExpandableList>)

  expect(returnData.length).toBe(1)
  returnData.forEach((item) => {
    expect(item.expanded).toBe(false)
  })
})

test('useExpandable will not filter items which do no have a parentId', () => {
  let returnData: any[] = []

  const list = [
    { key: '1', parentId: null },
    { key: '2', parentId: '1' },
    { key: 'grouping' },
    { key: '3', parentId: '2' },
    { key: '4', parentId: '3' }
  ]

  mount(
    <ExpandableList data={list} accessor={(item: any) => item.parentId} expanded>
      {(data: any) => {
        returnData = data
        return null
      }}
    </ExpandableList>)

  expect(returnData.length).toBe(5)
  expect(returnData[4].key).toBe('grouping')
})

test('noCollapsedParents returns true', () => {
  const one = { key: '1', expanded: true, index: 0 }
  const two = { key: '2', expanded: true, index: 1, [PARENT]: one }
  const three = { key: '3', expanded: true, index: 2, [PARENT]: two }
  const four = { key: '4', index: 3, [PARENT]: three }

  const list = [
    one,
    two,
    three,
    four
  ]

  const noneCollapsed = noCollapsedParents<any>(four, list)
  expect(noneCollapsed).toBe(true)
})

test('noCollapsedParents returns false', () => {
  const one = { key: '1', expanded: false, index: 0 }
  const two = { key: '2', expanded: true, index: 1, [PARENT]: one }
  const three = { key: '3', expanded: true, index: 2, [PARENT]: two }
  const four = { key: '4', index: 3, [PARENT]: three }

  const list = [
    one,
    two,
    three,
    four
  ]

  const noneCollapsed = noCollapsedParents<any>(four, list)
  expect(noneCollapsed).toBe(false)
})

test('getVisibleItems filters items of which all parents are expanded', () => {
  const one = { key: '1', expanded: true, index: 0 }
  const two = { key: '2', expanded: false, index: 1, [PARENT]: one }
  const three = { key: '3', expanded: true, index: 2, [PARENT]: two }
  const four = { key: '4', index: 3, [PARENT]: three }

  const list = [
    one,
    two,
    three,
    four
  ]

  expect(getVisibleItems<any>(list).length).toBe(2)
})

test('getVisibleItems returns all if all parents are expanded', () => {
  const one = { key: '1', expanded: true, index: 0 }
  const two = { key: '2', expanded: true, index: 1, [PARENT]: one }
  const three = { key: '3', expanded: true, index: 2, [PARENT]: two }
  const four = { key: '4', index: 3, [PARENT]: three }

  const list = [
    one,
    two,
    three,
    four
  ]

  expect(getVisibleItems<any>(list).length).toBe(4)
})

test('enrichItems enriches item from list with expand function', () => {
  const one = { key: '1', expanded: true, index: 0 }
  const two = { key: '2', expanded: true, index: 1, [PARENT]: one }
  const three = { key: '3', expanded: true, index: 2, [PARENT]: two }
  const four = { key: '4', expanded: true, index: 3, [PARENT]: three }

  const expandMock = jest.fn()

  const list = [
    one,
    two,
    three,
    four
  ]

  const items = enrichItems<any>(list, expandMock)
  items.forEach((item) => {
    item.expand()
  })

  expect(expandMock).toHaveBeenCalledTimes(4)
})

test('Expand mock should return a new copy of the original list', () => {
  const one = { key: '1', expanded: true, index: 0 }
  const two = { key: '2', expanded: true, index: 1, [PARENT]: one }
  const three = { key: '3', expanded: true, index: 2, [PARENT]: two }
  const four = { key: '4', expanded: true, index: 3, [PARENT]: three }

  const expandMock = jest.fn(result => result)

  const list = [
    one,
    two,
    three,
    four
  ]

  const items = enrichItems<any>(list, expandMock)
  items[0].expand()

  const resultListMock = expandMock.mock.results[0].value

  expect(resultListMock).not.toBe(list)
})

test('Expand mock should return a new copy of item which called expand function', () => {
  const one = { key: '1', expanded: true }
  const two = { key: '2', expanded: true, [PARENT]: one }
  const three = { key: '3', expanded: true, [PARENT]: two }
  const four = { key: '4', expanded: true, [PARENT]: three }

  const expandMock = jest.fn(result => result)

  const list = [
    one,
    two,
    three,
    four
  ]

  const items = enrichItems<any>(list, expandMock)
  items[0].expand()

  const resultListMock = expandMock.mock.results[0].value

  expect(resultListMock).not.toBe(list)
  expect(resultListMock[0]).not.toBe(list[0])
  expect(resultListMock[1]).toBe(list[1])
  expect(resultListMock[2]).toBe(list[2])
  expect(resultListMock[3]).toBe(list[3])
})

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

test('orderChildrenUnderParents extends items with expand attribute', () => {
  const list = [
    { key: '1', parentId: null },
    { key: '2', parentId: '3' },
    { key: '3', parentId: '1' },
    { key: '4', parentId: '2' }
  ]

  const map = createParentChildrenMap(list, (item) => item.parentId)

  const itemsTrue = orderChildrenUnderParents<any>(map, true)
  itemsTrue.forEach((item) => {
    expect(item.expanded).toBe(true)
  })

  const itemsFalse = orderChildrenUnderParents<any>(map, false)
  itemsFalse.forEach((item) => {
    expect(item.expanded).toBe(false)
  })
})

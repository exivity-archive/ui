import React from 'react'
import { mount } from 'enzyme'

import {
  PARENT
} from '../utils/makeParentChildTree'

import {
  enrichTreeItems,
  getVisibleItems,
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

  expect(returnData).toHaveLength(1)
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
    <ExpandableList
      data={list}
      accessor={(item: any) => item.parentId}
      expandedKeys={expandedItems}>
      {(data: any) => {
        [returnData] = data
        return null
      }}
    </ExpandableList>)

  expect(returnData).toHaveLength(3)
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
          expect(returnData).toHaveLength(1)

          tree.expand.children('1')
        }

        if (returnData.length !== 1) {
          expect(returnData).toHaveLength(4)
        }
        return null
      }}
    </ExpandableList>)
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
    <ExpandableList
      data={list}
      accessor={(item: any) => item.parentId}
      expandedKeys={['1', '2', '3']}>
      {(data: any) => {
        [returnData] = data
        return null
      }}
    </ExpandableList>)

  expect(returnData).toHaveLength(5)
  expect(returnData[4].key).toBe('grouping')
})

test('getVisibleItems filters items of which all parents are expanded', () => {
  const one = { key: '1', [PARENT]: null }
  const two = { key: '2', [PARENT]: one }
  const three = { key: '3', [PARENT]: two }
  const four = { key: '4', [PARENT]: three }

  const expandedKeys = ['1', '3']

  const list = [
    one,
    two,
    three,
    four
  ]

  expect(getVisibleItems<any>(list, expandedKeys)).toHaveLength(2)
})

test('getVisibleItems returns all if all parents are expanded', () => {
  const one = { key: '1', [PARENT]: null }
  const two = { key: '2', [PARENT]: one }
  const three = { key: '3', [PARENT]: two }
  const four = { key: '4', [PARENT]: three }

  const expandedKeys = ['1', '2', '3']

  const list = [
    one,
    two,
    three,
    four
  ]

  expect(getVisibleItems<any>(list, expandedKeys)).toHaveLength(4)
})

test('enrichTreeItems enriches item from list with expand function', () => {
  const one = { key: '1', [PARENT]: null }
  const two = { key: '2', [PARENT]: one }
  const three = { key: '3', [PARENT]: two }
  const four = { key: '4', [PARENT]: three }

  const expandMock = jest.fn()

  const expandedKeys: string[] = []

  const list = [
    one,
    two,
    three,
    four
  ]

  const items = enrichTreeItems<any>(list, expandedKeys, expandMock)
  items.forEach((item) => {
    item.expand()
  })

  expect(expandMock).toHaveBeenCalledTimes(4)
})

test('Expand mock should return a new array with expandedKeys', () => {
  const one = { key: '1', [PARENT]: null }
  const two = { key: '2', [PARENT]: one }
  const three = { key: '3', [PARENT]: two }
  const four = { key: '4', [PARENT]: three }

  const expandMock = jest.fn(result => result)

  const expandedKeys: string[] = []

  const list = [
    one,
    two,
    three,
    four
  ]

  const items = enrichTreeItems<any>(list, expandedKeys, expandMock)
  items[0].expand()

  const resultOneListMock = expandMock.mock.results[0].value

  expect(resultOneListMock).not.toBe(expandedKeys)
  expect(resultOneListMock).toEqual(['1'])
})

test('enrichItems should return new items', () => {
  const one = { key: '1', [PARENT]: null }
  const two = { key: '2', [PARENT]: one }
  const three = { key: '3', [PARENT]: two }
  const four = { key: '4', [PARENT]: three }

  const expandMock = jest.fn(result => result)

  const list = [
    one,
    two,
    three,
    four
  ]

  const items = enrichTreeItems<any>(list, [], expandMock)

  expect(items[0]).not.toBe(list[0])
  expect(items[1]).not.toBe(list[1])
  expect(items[2]).not.toBe(list[2])
  expect(items[3]).not.toBe(list[3])
})

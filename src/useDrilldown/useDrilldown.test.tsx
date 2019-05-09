import React from 'react'
import { mount } from 'enzyme'

import {
  getAndEnrichVisibleItems,
  useDrilldown
} from '.'
import {
  PARENT
} from '../utils/makeParentChildTree'

interface Record {
  key: string
  parentId: string | null
}

const DrilldownList = ({ children, data, accessor }: any) => {
  return children(useDrilldown<Record>(data, accessor))
}

test('useDrilldown initially returns all root items', () => {
  let returnData: Record[] = []

  const list: Record[] = [
    { key: '1', parentId: null },
    { key: '2', parentId: '1' },
    { key: '3', parentId: '2' },
    { key: '4', parentId: '3' }
  ]

  mount(
    <DrilldownList data={list} accessor={(item: any) => item.parentId}>
      {(data: any) => {
        returnData = data
        return null
      }}
    </DrilldownList>)

  expect(returnData.length).toBe(1)
})

test('getAndEnrichVisibleItems filters items that are visible', () => {
  const one = { key: '1', [PARENT]: null }
  const two = { key: '2', [PARENT]: one }
  const three = { key: '3', [PARENT]: two }
  const four = { key: '4', [PARENT]: three }

  const visibleKeys = ['1', '3']
  const setVisible = jest.fn()

  const list = [
    one,
    two,
    three,
    four
  ]

  expect(getAndEnrichVisibleItems<any>(list, visibleKeys, setVisible).length).toBe(2)
})

test('enrichTreeItems enriches item from list with expand function', () => {
  const one = { key: '1', [PARENT]: null }
  const two = { key: '2', [PARENT]: one }
  const three = { key: '3', [PARENT]: two }

  const visibleKeys: string[] = ['1', '2', '3']
  const setVisibleMock = jest.fn()

  const list = [
    one,
    two,
    three
  ]

  const items = getAndEnrichVisibleItems<any>(list, visibleKeys, setVisibleMock)

  const enrichmentKeys = [
    'visibleChildren',
    'hiddenChildren',
    'drilldown',
    'replace',
    'remove',
    'getHiddenSiblings',
    'getVisibleSiblings',
    'level'
  ]

  items.forEach(item => {
    enrichmentKeys.forEach(key => {
      expect(item).toHaveProperty(key)
    })
  })
})

test('getAndEnrichVisibleItems should return new items', () => {
  const one = { key: '1', [PARENT]: null }
  const two = { key: '2', [PARENT]: one }
  const three = { key: '3', [PARENT]: two }
  const four = { key: '4', [PARENT]: three }

  const visible = ['1', '2', '3', '4']
  const setVisibleMock = jest.fn(result => result)

  const list = [
    one,
    two,
    three,
    four
  ]

  const items = getAndEnrichVisibleItems<any>(list, visible, setVisibleMock)

  expect(items[0]).not.toBe(list[0])
  expect(items[1]).not.toBe(list[1])
  expect(items[2]).not.toBe(list[2])
  expect(items[3]).not.toBe(list[3])
})

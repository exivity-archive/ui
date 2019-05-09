import { renderHook } from 'react-hooks-testing-library'

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

const parentKeyAccessor = ({ parentId }: any) => parentId

test('useDrilldown initially returns all root items', () => {
  const one = { key: '1', parentId: null }
  const two = { key: '2', parentId: '1' }
  const three = { key: '3', parentId: '2' }
  const four = { key: '4', parentId: '3' }

  const list: Record[] = [
    one,
    two,
    three,
    four
  ]

  const { result } = renderHook(() => useDrilldown(list, parentKeyAccessor))

  expect(result.current.length).toBe(1)
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

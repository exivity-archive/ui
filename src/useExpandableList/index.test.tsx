import React from 'react'
import { mount } from 'enzyme'

import {
    getVisibleItems,
    noCollapsedParents,
    enrichItems,
    memoizeCreateParentChildrenMap,
    transformAndOrder,
    index
} from '.'

import { PARENT, CHILDREN } from './helpers'

const ExpandableList = ({ children, data, accessor, expanded }: any) => {
    return children(index<any>(data, accessor, expanded))
}

test('useExpandableList expanded', () => {
    let returnData: any[] = []

    const list = [
        { key: '1', parentId: null },
        { key: '2', parentId: '3' },
        { key: '3', parentId: '1' },
        { key: '4', parentId: '2'  }
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

test('useExpandableList not expanded', () => {
    let returnData: any[] = []

    const list = [
        { key: '1', parentId: null },
        { key: '2', parentId: '3' },
        { key: '3', parentId: '1' },
        { key: '4', parentId: '2'  }
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

test('noCollapsedParents returns true', () => {
    const one = { key: '1', expanded: true, originalIndex: 0 }
    const two = { key: '2', expanded: true, originalIndex: 1, [PARENT]: one }
    const three = { key: '3', expanded: true, originalIndex: 2, [PARENT]: two }
    const four = { key: '4', originalIndex: 3, [PARENT]: three }

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
    const one = { key: '1', expanded: false, originalIndex: 0 }
    const two = { key: '2', expanded: true, originalIndex: 1, [PARENT]: one }
    const three = { key: '3', expanded: true, originalIndex: 2, [PARENT]: two}
    const four = { key: '4', originalIndex: 3, [PARENT]: three }

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
    const one = { key: '1', expanded: true, originalIndex: 0 }
    const two = { key: '2', expanded: false, originalIndex: 1, [PARENT]: one }
    const three = { key: '3', expanded: true, originalIndex: 2, [PARENT]: two}
    const four = { key: '4', originalIndex: 3, [PARENT]: three }

    const list = [
        one,
        two,
        three,
        four
    ]

    expect(getVisibleItems<any>(list).length).toBe(2)
})

test('getVisibleItems returns all if all parents are expanded', () => {
    const one = { key: '1', expanded: true, originalIndex: 0 }
    const two = { key: '2', expanded: true, originalIndex: 1, [PARENT]: one }
    const three = { key: '3', expanded: true, originalIndex: 2, [PARENT]: two}
    const four = { key: '4', originalIndex: 3, [PARENT]: three }

    const list = [
        one,
        two,
        three,
        four
    ]

    expect(getVisibleItems<any>(list).length).toBe(4)
})

test('enrichItems enriches item from list with expand function', () => {
    const one = { key: '1', expanded: true, originalIndex: 0 }
    const two = { key: '2', expanded: true, originalIndex: 1, [PARENT]: one }
    const three = { key: '3', expanded: true, originalIndex: 2, [PARENT]: two}
    const four = { key: '4', expanded: true, originalIndex: 3, [PARENT]: three }

    const expandMock = jest.fn()

    const originalList = [
        one,
        two,
        three,
        four
    ]

    const list = [ ...originalList ]

    const items = enrichItems<any>(list, originalList, expandMock)
    items.forEach((item) => {
        item.expand()
    })

    expect(expandMock).toHaveBeenCalledTimes(4)
})

test('Expand mock should return a new copy of the original list', () => {
    const one = { key: '1', expanded: true, originalIndex: 0 }
    const two = { key: '2', expanded: true, originalIndex: 1, [PARENT]: one }
    const three = { key: '3', expanded: true, originalIndex: 2, [PARENT]: two}
    const four = { key: '4', expanded: true, originalIndex: 3, [PARENT]: three }

    const expandMock = jest.fn(result => result)

    const originalList = [
        one,
        two,
        three,
        four
    ]

    const list = [ ...originalList ].slice(0,2)

    const items = enrichItems<any>(list, originalList, expandMock)
    items[0].expand()

    const resultListMock = expandMock.mock.results[0].value

    expect(resultListMock).not.toBe(originalList)
    expect(resultListMock).toEqual(originalList)
})

test('memoizeCreateParentChildrenMap creates a map by keys', () => {
    const list = [
        { key: '1' , parentId: null },
        { key: '2', parentId: '1' },
        { key: '3', parentId: '2' },
        { key: '4', parentId: '3'  }
    ]

    const map = memoizeCreateParentChildrenMap(list, (item) => item.parentId)

    expect(map['1']).toBe(list[0])
    expect(map['2']).toBe(list[1])
    expect(map['3']).toBe(list[2])
    expect(map['4']).toBe(list[3])
})

test('memoizeCreateParentChildrenMap creates a map with a parent reference', () => {
    const list = [
        { key: '1' , parentId: null },
        { key: '2', parentId: '1' },
        { key: '3', parentId: '2' },
        { key: '4', parentId: '3'  }
    ]

    const map = memoizeCreateParentChildrenMap(list, (item) => item.parentId)

    expect(map['1'][PARENT]).toBe(undefined)
    expect(map['2'][PARENT]).toBe(list[0])
    expect(map['3'][PARENT]).toBe(list[1])
    expect(map['4'][PARENT]).toBe(list[2])
})

test('memoizeCreateParentChildrenMap creates a map with child references', () => {
    const list = [
        { key: '1' , parentId: null },
        { key: '2', parentId: '1' },
        { key: '3', parentId: '2' },
        { key: '4', parentId: '3'  }
    ]

    const map = memoizeCreateParentChildrenMap(list, (item) => item.parentId)

    expect(map['1'][CHILDREN][0]).toBe(list[1])
    expect(map['2'][CHILDREN][0]).toBe(list[2])
    expect(map['3'][CHILDREN][0]).toBe(list[3])
    expect(map['4'][CHILDREN]).toBe(undefined)
})

test('transformAndOrder creates a list from a map', () => {
    const list = [
        { key: '1' , parentId: null },
        { key: '2', parentId: '1' },
        { key: '3', parentId: '2' },
        { key: '4', parentId: '3'  }
    ]

    const map = memoizeCreateParentChildrenMap(list, (item) => item.parentId)

    const items = transformAndOrder<any>(map, true)
    expect(items.length).toBe(4)
})

test('transformAndOrder orders children directly under their parents', () => {
    const list = [
        { key: '1' , parentId: null },
        { key: '2', parentId: '3' },
        { key: '3', parentId: '1' },
        { key: '4', parentId: '2'  }
    ]

    const map = memoizeCreateParentChildrenMap(list, (item) => item.parentId)

    const items = transformAndOrder<any>(map, true)
    expect(items[0].key).toBe('1')
    expect(items[1].key).toBe('3')
    expect(items[2].key).toBe('2')
    expect(items[3].key).toBe('4')
})

test('transformAndOrder extends items with expand attribute', () => {
    const list = [
        { key: '1', parentId: null },
        { key: '2', parentId: '3' },
        { key: '3', parentId: '1' },
        { key: '4', parentId: '2'  }
    ]

    const map = memoizeCreateParentChildrenMap(list, (item) => item.parentId)

    const itemsTrue = transformAndOrder<any>(map, true)
    itemsTrue.forEach((item) => {
        expect(item.expanded).toBe(true)
    })

    const itemsFalse = transformAndOrder<any>(map, false)
    itemsFalse.forEach((item) => {
        expect(item.expanded).toBe(false)
    })
})

test('transformAndOrder extends items with originalIndex attribute which is result index', () => {
    const list = [
        { key: '1', parentId: null },
        { key: '2', parentId: '3' },
        { key: '3', parentId: '1' },
        { key: '4', parentId: '2' }
    ]

    const map = memoizeCreateParentChildrenMap(list, (item) => item.parentId)

    const items = transformAndOrder<any>(map, true)

    expect(items[0].originalIndex).toBe(0)
    expect(items[1].originalIndex).toBe(1)
    expect(items[2].originalIndex).toBe(2)
    expect(items[3].originalIndex).toBe(3)
})

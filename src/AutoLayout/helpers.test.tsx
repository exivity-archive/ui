import React from 'react'
import { renderHook, act } from 'react-hooks-testing-library'

import { makeRows, getHeight, wrapInWidget, applySpacing, useSpacing } from './helpers'
import { Column } from './Column'

test('makeRows', () => {
  const children = [
    <Column />,
    <Column />,
    <Column newRow />,
    <Column />,
    <Column newRow />,
    <Column />
  ]

  const rows = makeRows(children)

  expect(rows).toHaveLength(3)

  rows.forEach((row) => {
    expect(row).toHaveLength(2)
  })
})

test('wrapInWidget', () => {
  const children = [
    <Column />,
    <Column />,
    <Column newRow />,
    <Column />,
    <Column newRow />,
    <Column />
  ]

  const rows = makeRows(children)
  const wrapped = wrapInWidget(rows, true)
  const notWrapped = wrapInWidget(rows, false)

  wrapped.forEach(row => {
    row.forEach((element) => {
      expect(element.type.displayName).toBe('Widget')
    })
  })

  notWrapped.forEach(row => {
    row.forEach((element) => {
      expect(element.type.displayName).toBe('Styled(FlexItem)')
    })
  })
})

test('applySpacing', () => {
  const heightOffset = '0px'

  const children = [
    <Column />,
    <Column />,
    <Column newRow />,
    <Column />,
    <Column newRow />,
    <Column />
  ]

  const rows = makeRows(children)

  const spacingApplied = applySpacing(rows, heightOffset, 1)

  spacingApplied.forEach(row => {
    row.forEach((element, index) => {
      if (index === 0) {
        expect(element.props.ml).toBe(1)
      }

      expect(element.props.mt).toBe(1)
      expect(element.props.mr).toBe(1)
    })
  })
})

describe('useSpacing', () => {
  let map: any = []

  // @ts-ignore
  window.matchMedia = jest.fn(() => {
    return {
      addListener (cb: any) {
        map.push(cb)
      }
    }
  })

  test('first breakpoint', () => {
    map = []
    const { result } = renderHook(() => useSpacing([1, 2, 3]))

    act(() => {
      map[0]({ matches: true })
    })

    expect(result.current).toBe(1)
  })

  test('second breakpoint', () => {
    map = []
    const { result } = renderHook(() => useSpacing([1, 2, 3]))

    act(() => {
      map[1]({ matches: true })
    })

    expect(result.current).toBe(2)
  })

  test('thirth breakpoint', () => {
    map = []
    const { result } = renderHook(() => useSpacing([1, 2, 3]))

    act(() => {
      map[2]({ matches: true })
    })

    expect(result.current).toBe(3)
  })
})

describe('getHeight', () => {
  test('no height and no spacing', () => {
    const height = undefined
    const heightOffset = '0px'
    const spacing = undefined

    expect(getHeight(height, heightOffset, spacing)).toBe('100%')
  })

  test('no height and spacing', () => {
    const height = undefined
    const heightOffset = '16em'
    const spacing = 1

    expect(getHeight(height, heightOffset, spacing)).toBe('calc(100% - 16em)')
  })

  test('height as number and spacing', () => {
    const height = 400
    const heightOffset = '16em'
    const spacing = 1

    expect(getHeight(height, heightOffset, spacing)).toBe('calc(400px - 16em)')
  })

  test('height as string and spacing', () => {
    const height = '80%'
    const heightOffset = '16em'
    const spacing = 1

    expect(getHeight(height, heightOffset, spacing)).toBe('calc(80% - 16em)')
  })

  test('height and no spacing', () => {
    const height = '80%'
    const heightOffset = '0px'
    const spacing = undefined

    expect(getHeight(height, heightOffset, spacing)).toBe(height)
  })
})

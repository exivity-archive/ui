import React from 'react'
import { renderHook, act } from 'react-hooks-testing-library'

import { Position, ADORNMENT_DISPLAY_NAME, ExtraPadding } from './Adornment'
import { useAddWidthToPadding, useCloneChildWithPadding } from './hooks'

describe('useAddWidthToPadding(...)', () => {
  test('Returns the same extra padding if width is 0', () => {
    const extraPadding = {
      [Position.LEFT]: '10px',
      [Position.RIGHT]: '10px'
    }

    const position = Position.LEFT

    const { result } = renderHook(() => useAddWidthToPadding(extraPadding, position))
    let [newExtraPadding, setWidth] = result.current

    expect(newExtraPadding).toBe(extraPadding)

    act(() => {
      setWidth(0)
    })

    newExtraPadding = result.current[0]

    expect(newExtraPadding).toBe(extraPadding)
  })

  test('Width gets added to extraPadding for the given position', () => {
    const extraPadding = {
      [Position.LEFT]: '10px',
      [Position.RIGHT]: '10px'
    }

    const position = Position.LEFT

    const width = 20

    const { result } = renderHook(() => useAddWidthToPadding(extraPadding, position))
    let [newExtraPadding, setWidth] = result.current

    act(() => {
      setWidth(width)
    })

    newExtraPadding = result.current[0]

    expect(newExtraPadding[position]).toBe(`calc(${extraPadding[position]} + ${width}px)`)
  })

  test('Other position stays unchanged if width is set', () => {
    const extraPadding = {
      [Position.LEFT]: '10px',
      [Position.RIGHT]: '10px'
    }

    const position = Position.LEFT

    const width = 20

    const { result } = renderHook(() => useAddWidthToPadding(extraPadding, position))
    let [newExtraPadding, setWidth] = result.current

    act(() => {
      setWidth(width)
    })

    newExtraPadding = result.current[0]

    expect(newExtraPadding[Position.RIGHT]).toBe(extraPadding[Position.RIGHT])
  })
})

describe('useCloneChildWithPadding(...)', () => {
  test('Throws an error if more than one child is given', () => {
    const children = [<div />, <div />]

    const extraPadding = {
      [Position.LEFT]: '10px',
      [Position.RIGHT]: '20px'
    }

    const { result } = renderHook(() => useCloneChildWithPadding(children, extraPadding))

    expect(result.error).toBeDefined()
  })

  test('Throws an error if child isn\'t a ReactElement', () => {
    const children = null

    const extraPadding = {
      [Position.LEFT]: '10px',
      [Position.RIGHT]: '20px'
    }

    const { result } = renderHook(() => useCloneChildWithPadding(children, extraPadding))

    expect(result.error).toBeDefined()
  })

  test('Doesn\'t throw an error when only one child is given', () => {
    const children = <div />

    const extraPadding = {
      [Position.LEFT]: '10px',
      [Position.RIGHT]: '20px'
    }

    const { result } = renderHook(() => useCloneChildWithPadding(children, extraPadding))

    expect(result.error).toBeUndefined()
  })

  test('Passes extraPadding to child if display name is: ' + ADORNMENT_DISPLAY_NAME, () => {
    const Component = () => <div />
    Component.displayName = ADORNMENT_DISPLAY_NAME

    const children = <Component />

    const extraPadding = {
      [Position.LEFT]: '10px',
      [Position.RIGHT]: '20px'
    }

    const { result } = renderHook(() => useCloneChildWithPadding(children, extraPadding))
    const child = result.current

    expect(child.props.extraPadding).toBe(extraPadding)
  })

  test('Merges it with existing extraPadding to child if display name is: ' + ADORNMENT_DISPLAY_NAME, () => {
    const Component = (props: { extraPadding: ExtraPadding }) => <div />
    Component.displayName = ADORNMENT_DISPLAY_NAME

    const extraPaddingA = {
      [Position.LEFT]: '10px',
      [Position.RIGHT]: '20px'
    }

    const children = <Component extraPadding={extraPaddingA} />

    const extraPaddingB = {
      [Position.LEFT]: '30px',
      [Position.RIGHT]: '50px'
    }

    const { result } = renderHook(() => useCloneChildWithPadding(children, extraPaddingB))
    const child = result.current

    expect(child.props.extraPadding[Position.LEFT])
      .toBe(`calc(${extraPaddingB[Position.LEFT]} + ${extraPaddingA[Position.LEFT]})`)

    expect(child.props.extraPadding[Position.RIGHT])
      .toBe(`calc(${extraPaddingB[Position.RIGHT]} + ${extraPaddingA[Position.RIGHT]})`)
  })

  test('Passes it as style to other components', () => {
    const children = <div />

    const extraPadding = {
      [Position.LEFT]: '10px',
      [Position.RIGHT]: '20px'
    }

    const { result } = renderHook(() => useCloneChildWithPadding(children, extraPadding))
    const child = result.current

    expect(child.props.style.paddingLeft).toBe(extraPadding[Position.LEFT])
    expect(child.props.style.paddingRight).toBe(extraPadding[Position.RIGHT])
  })

  test('Keeps existing style intact', () => {
    const children = <div style={{ color: 'blue' }} />

    const extraPadding = {
      [Position.LEFT]: '10px',
      [Position.RIGHT]: '20px'
    }

    const { result } = renderHook(() => useCloneChildWithPadding(children, extraPadding))
    const child = result.current

    expect(child.props.style).toHaveProperty('color')
  })

  test('Merges existing padding on style object', () => {
    const style = { paddingLeft: '10px' }
    const children = <div style={style} />

    const extraPadding = {
      [Position.LEFT]: '10px',
      [Position.RIGHT]: '20px'
    }

    const { result } = renderHook(() => useCloneChildWithPadding(children, extraPadding))
    const child = result.current

    expect(child.props.style.paddingLeft).toBe(`calc(${style.paddingLeft} + ${extraPadding[Position.LEFT]})`)
  })
})

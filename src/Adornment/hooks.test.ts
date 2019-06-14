import { renderHook, act } from 'react-hooks-testing-library'

import { Position } from './Adornment'
import { useAddWidthToPadding } from './hooks'

describe('useAddWidthToPadding(...)', () => {
  test('returns the exact same extra padding if width is 0', () => {
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

  test('width gets added to extraPadding for the given position', () => {
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

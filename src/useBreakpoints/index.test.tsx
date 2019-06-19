import { act, renderHook } from 'react-hooks-testing-library'
import { useBreakpoint } from './'

describe('useBreakpoint', () => {
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
    const { result } = renderHook(() => useBreakpoint())

    act(() => {
      map[0]({ matches: true })
    })
    expect(result.current).toBe(0)
  })

  test('second breakpoint', () => {
    map = []
    const { result } = renderHook(() => useBreakpoint())

    act(() => {
      map[1]({ matches: true })
    })

    expect(result.current).toBe(1)
  })

  test('thirth breakpoint', () => {
    map = []
    const { result } = renderHook(() => useBreakpoint())

    act(() => {
      map[2]({ matches: true })
    })

    expect(result.current).toBe(2)
  })
})

import { renderHook, act } from 'react-hooks-testing-library'
import { useClientRect } from './useClientRect'

describe('useClientRect(...)', () => {
  test('rect initializes to null', () => {
    const { result } = renderHook(() => useClientRect())
    const [rect] = result.current

    expect(rect).toBe(null)
  })

  test('rect stays null when node is null', () => {
    const { result } = renderHook(() => useClientRect())
    const [rect, ref] = result.current

    act(() => {
      ref(null)
    })

    expect(rect).toBe(null)
  })

  test('rect gets set when node is defined', () => {
    const { result } = renderHook(() => useClientRect())
    let [rect, ref] = result.current

    const boundingClientRect: any = {}
    act(() => {
      ref({ getBoundingClientRect: () => boundingClientRect } as any)
    })

    rect = result.current[0]

    expect(rect).toBe(boundingClientRect)
  })
})

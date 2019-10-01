import { renderHook, act } from 'react-hooks-testing-library'
import useClosable from './useClosable'

describe('Dropdown useClosable hook', () => {

  test('uses `defaultOpen`, if `open` is not provided', () => {
    const { result } = renderHook(() => useClosable(true, null, () => null))
    expect(result.current.isOpen).toBe(true)
  })

  test('ignores `defaultOpen`, if `open` is provided', () => {
    const { result } = renderHook(() => useClosable(true, false, () => null))
    expect(result.current.isOpen).toBe(false)
  })

  test('changes the state, if `open` is not provided', () => {
    const { result } = renderHook(() => useClosable(false, null, () => null))
    expect(result.current.isOpen).toBe(false)

    act(() => result.current.open())
    expect(result.current.isOpen).toBe(true)

    act(() => result.current.close())
    expect(result.current.isOpen).toBe(false)

    act(() => result.current.toggle())
    expect(result.current.isOpen).toBe(true)
  })

  test('does not change the state, if `open` is provided', () => {
    const { result } = renderHook(() => useClosable(false, false, () => null))
    expect(result.current.isOpen).toBe(false)

    act(() => result.current.open())
    expect(result.current.isOpen).toBe(false)

    act(() => result.current.toggle())
    expect(result.current.isOpen).toBe(false)
  })

  test('calls `onToggle` after state is changed, if `open` is not provided', () => {
    const onToggle = jest.fn()
    const { result } = renderHook(() => useClosable(false, null, onToggle))

    expect(result.current.isOpen).toBe(false)

    act(() => result.current.open())
    expect(result.current.isOpen).toBe(true)
    expect(onToggle.mock.calls.length).toBe(1)
    expect(onToggle.mock.calls[0][0]).toBe(true)
  })

  test('calls `onToggle` with needed value without any changes, if `open` is provided', () => {
    const onToggle = jest.fn()
    const { result } = renderHook(() => useClosable(false, false, onToggle))

    expect(result.current.isOpen).toBe(false)

    act(() => result.current.open())
    expect(result.current.isOpen).toBe(false)
    expect(onToggle.mock.calls.length).toBe(1)
    expect(onToggle.mock.calls[0][0]).toBe(true)
  })

})

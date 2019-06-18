import { renderHook } from 'react-hooks-testing-library'
import { useRefDependentSpacing } from '.'

test('Returns the baseValue if nodeAccessor returns undefined', () => {
  const baseValue = 20
  const nodeAccessor = () => undefined

  const { result } = renderHook(() => useRefDependentSpacing({ baseValue, nodeAccessor }))
  const [value, ref] = result.current

  expect(value).toBe('20px')
})

test('Returns the ref accessor return value if baseValue is undefined', () => {
  const nodeAccessor = () => 100

  const { result } = renderHook(() => useRefDependentSpacing({ nodeAccessor }))
  const [value, ref] = result.current

  expect(value).toBe('100px')
})

test('Returns opx if both the ref accessor return type and the baseValue are undefined', () => {
  const nodeAccessor = () => undefined

  const { result } = renderHook(() => useRefDependentSpacing({ nodeAccessor }))
  const [value, ref] = result.current

  expect(value).toBe('0')
})

test('Returns the baseValue and the nodeAccessor return value if nodeAccessor returns something', () => {
  const baseValue = 20
  const nodeAccessor = () => 100

  const { result } = renderHook(() => useRefDependentSpacing({ baseValue, nodeAccessor }))
  const [value, ref] = result.current
  expect(value).toBe('calc(20px + 100px)')
})

test('Value changes if baseValue changes', () => {

  const nodeAccessor = () => 100
  const initialProps = { baseValue: 10, nodeAccessor }

  const { result, rerender } = renderHook(
    (props) => useRefDependentSpacing(props),
    { initialProps }
  )

  let value = result.current[0]

  expect(value).toBe('calc(10px + 100px)')

  rerender({ baseValue: 40, nodeAccessor })

  value = result.current[0]

  expect(value).toBe('calc(40px + 100px)')
})

test('Value changes if ref accessor return value changes', () => {

  const baseValue = 20
  const initialProps = { baseValue, nodeAccessor: () => 100 }

  const { result, rerender } = renderHook(
    (props) => useRefDependentSpacing(props),
    { initialProps }
  )

  let value = result.current[0]

  expect(value).toBe('calc(20px + 100px)')

  rerender({ baseValue, nodeAccessor: () => 200 })

  value = result.current[0]

  expect(value).toBe('calc(20px + 200px)')
})

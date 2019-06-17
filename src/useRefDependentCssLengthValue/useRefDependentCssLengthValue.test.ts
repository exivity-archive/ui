import { renderHook } from 'react-hooks-testing-library'
import { useRefDependentCssLengthValue } from '.'

test('Returns the baseValue if refAccessor returns undefined', () => {
  const baseValue = 20
  const refAccessor = (ref) => undefined

  const { result } = renderHook(() => useRefDependentCssLengthValue({ baseValue, refAccessor }))
  const [value, ref] = result.current

  expect(value).toBe('20px')
})

test('Returns the ref accessor return value if baseValue is undefined', () => {
  const refAccessor = (ref) => 100

  const { result } = renderHook(() => useRefDependentCssLengthValue({ refAccessor }))
  const [value, ref] = result.current

  expect(value).toBe('100px')
})

test('Returns opx if both the ref accessor return type and the baseValue are undefined', () => {
  const refAccessor = (ref) => undefined

  const { result } = renderHook(() => useRefDependentCssLengthValue({ refAccessor }))
  const [value, ref] = result.current

  expect(value).toBe('0')
})

test('Returns the baseValue and the refAccessor return value if refAccessor returns something', () => {
  const baseValue = 20
  const refAccessor = (ref) => 100

  const { result } = renderHook(() => useRefDependentCssLengthValue({ baseValue, refAccessor }))
  const [value, ref] = result.current
  expect(value).toBe('calc(20px + 100px)')
})

test('Value changes if baseValue changes', () => {

  const refAccessor = () => 100
  const initialProps = { baseValue: 10, refAccessor }

  const { result, rerender } = renderHook(
    (props) => useRefDependentCssLengthValue(props),
    { initialProps }
  )

  let value = result.current[0]

  expect(value).toBe('calc(10px + 100px)')

  rerender({ baseValue: 40, refAccessor })

  value = result.current[0]

  expect(value).toBe('calc(40px + 100px)')
})

test('Value changes if ref accessor return value changes', () => {

  const baseValue = 20
  const initialProps = { baseValue, refAccessor: () => 100 }

  const { result, rerender } = renderHook(
    (props) => useRefDependentCssLengthValue(props),
    { initialProps }
  )

  let value = result.current[0]

  expect(value).toBe('calc(20px + 100px)')

  rerender({ baseValue, refAccessor: () => 200 })

  value = result.current[0]

  expect(value).toBe('calc(20px + 200px)')
})

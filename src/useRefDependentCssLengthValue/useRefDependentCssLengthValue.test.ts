import { renderHook } from 'react-hooks-testing-library'
import { useRefDependentCssLengthValue } from '.'

test('Returns the baseValue if refAccessor returns undefined', () => {
  const baseSpacing = 20

  const { result } = renderHook(() => useRefDependentCssLengthValue(baseSpacing, (ref) => {
    if (ref.current) {
      return 100
    }
  }))
  const [value, ref] = result.current
  expect(value).toBe('20px')
})

test('Returns the baseValue if refAccessor returns undefined', () => {
  const baseSpacing = 20

  const { result } = renderHook(() => useRefDependentCssLengthValue(baseSpacing, (ref) => {
    if (ref.current) {
      return 100
    }
  }))
  const [value, ref] = result.current
  expect(value).toBe('20px')
})

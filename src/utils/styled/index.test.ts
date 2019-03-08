import { fromTheme, matchThemeProp } from '.'
import { lightTheme } from '../../themes'

describe('fromTheme', () => {
  const theme = {
    key: 'val'
  } as any

  test('fromTheme should resolve values from theme prop', () => {
    const fn = fromTheme((theme: any) => theme.key)
    expect(fn({ theme })).toBe('val')
  })

  test('fromTheme should resolve to lightTheme if no theme prop is available', () => {
    const fn = fromTheme((theme: any) => theme.global.baseSize)
    expect(fn({})).toBe(lightTheme.global.baseSize)
  })
})

describe('matchThemeProp', () => {
  const theme = {
    test: {
      a: 'val1',
      b: 'val2',
      default: 'defaultValue'
    },
    withoutDefault: {
      c: 'val3',
      d: 'val4'
    }
  } as any

  test('matchThemeProp should return value given theme prop and a boolean prop key match', () => {
    const fn = matchThemeProp((theme: any) => theme.test)
    expect(fn({ theme, a: true })).toBe('val1')
  })

  test('matchThemeProp should return value given theme prop and a string prop key match', () => {
    const fn = matchThemeProp((theme: any) => theme.test)
    expect(fn({ theme, a: 'someValue' })).toBe('val1')
  })

  test('matchThemeProp should return default value given theme prop and no prop key match', () => {
    const fn = matchThemeProp((theme: any) => theme.test)
    expect(fn({ theme, a: 'someValue' })).toBe('val1')
  })

  test('fromTheme should resolve to lightTheme if no theme prop is available', () => {
    const fn = fromTheme((theme: any) => theme.global.baseSize)
    expect(fn({})).toBe(lightTheme.global.baseSize)
  })
})

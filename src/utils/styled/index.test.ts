import { fromTheme, matchThemeProp } from '.'
import { lightTheme } from '../../themes'
import { preciseEm } from './isolated'

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
      _default: 'b'
    },
    withoutDefault: {
      c: 'val3',
      d: 'val4'
    }
  } as any

  test('matchThemeProp should return value given theme prop and a boolean prop key match', () => {
    const fn = matchThemeProp((theme: any) => theme.test)
    expect(fn({ theme, a: true })).toBe(theme.test.a)
  })

  test('matchThemeProp should return value given theme prop and a string prop key match', () => {
    const fn = matchThemeProp((theme: any) => theme.test)
    expect(fn({ theme, a: 'someValue' })).toBe(theme.test.a)
  })

  test('matchThemeProp should return default value given theme prop and no prop key match', () => {
    const fn = matchThemeProp((theme: any) => theme.test)
    expect(fn({ theme })).toBe(theme.test[theme.test._default])
  })

  test('matchThemeProp should return null given theme prop and no prop key match', () => {
    const fn = matchThemeProp((theme: any) => theme.withoutDefault)
    expect(fn({ theme })).toBeNull()
  })

  test('matchThemeProp should resolve to lightTheme if no theme prop is available', () => {
    const fn = matchThemeProp((theme: any) => theme.global.sizes)
    expect(fn({ small: true })).toEqual(lightTheme.global.sizes.small)
  })

  test('matchThemeProp should resolve to lightTheme if no theme prop is available and return default value', () => {
    const fn = matchThemeProp((theme: any) => theme.global.sizes)
    // @ts-ignore
    expect(fn({})).toEqual(lightTheme.global.sizes[lightTheme.global.sizes._default])
  })

  const modifier = (match: string) => match.repeat(2)

  test('matchThemeProp should return modified value given theme prop and a prop key match', () => {
    const fn = matchThemeProp((theme: any) => theme.test, { modifier })
    expect(fn({ theme, a: true })).toBe(modifier(theme.test.a))
  })

  test('matchThemeProp should return modified default value given theme prop and no prop key match', () => {
    const fn = matchThemeProp((theme: any) => theme.test, { modifier })
    expect(fn({ theme })).toBe(modifier(theme.test[theme.test._default]))
  })

  test('matchThemeProp should return null given theme prop and no prop key match (modifier)', () => {
    const fn = matchThemeProp((theme: any) => theme.withoutDefault, { modifier })
    expect(fn({ theme })).toBeNull()
  })

  test('matchThemeProp should resolve to lightTheme if no theme prop is available (modifier)', () => {
    const fn = matchThemeProp((theme: any) => theme.global.purposes, { modifier })
    expect(fn({ secondary: true })).toEqual(modifier(lightTheme.global.purposes.secondary))
  })

  test('matchThemeProp should resolve to lightTheme if no theme prop is available and return modified default value', () => {
    const fn = matchThemeProp((theme: any) => theme.global.purposes, { modifier })
    // @ts-ignore
    expect(fn({})).toEqual(modifier(lightTheme.global.purposes[lightTheme.global.purposes._default]))
  })
})

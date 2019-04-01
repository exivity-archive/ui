import { fromTheme, matchThemeProp } from '.'
import { defaultTheme } from '../../themes'

describe('fromTheme', () => {
  const theme = {
    key: 'val'
  } as any

  test('fromTheme should resolve values from theme prop', () => {
    const fn = fromTheme((theme: any) => theme.key)
    expect(fn({ theme })).toBe('val')
  })

  test('fromTheme should resolve to defaultTheme if no theme prop is available', () => {
    const fn = fromTheme((theme: any) => theme.global.baseSize)
    expect(fn({})).toBe(defaultTheme.global.baseSize)
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

  test('matchThemeProp should resolve to defaultTheme if no theme prop is available', () => {
    const fn = matchThemeProp((theme: any) => theme.global.sizes)
    expect(fn({ small: true })).toEqual(defaultTheme.global.sizes.small)
  })

  test('matchThemeProp should resolve to defaultTheme if no theme prop is available and return default value', () => {
    const fn = matchThemeProp((theme: any) => theme.global.sizes)
    // @ts-ignore
    expect(fn({})).toEqual(defaultTheme.global.sizes[defaultTheme.global.sizes._default])
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

  test('matchThemeProp should resolve to defaultTheme if no theme prop is available (modifier)', () => {
    const fn = matchThemeProp((theme: any) => theme.global.purposes, { modifier })
    expect(fn({ secondary: true })).toEqual(modifier(defaultTheme.global.purposes.secondary))
  })

  test('matchThemeProp should resolve to defaultTheme if no theme prop is available and return modified default value', () => {
    const fn = matchThemeProp((theme: any) => theme.global.purposes, { modifier })
    // @ts-ignore
    expect(fn({})).toEqual(modifier(defaultTheme.global.purposes[defaultTheme.global.purposes._default]))
  })

  const defaultValue = 'val3'

  test('matchThemeProp should return default value given theme prop and a no prop key match', () => {
    const fn = matchThemeProp((theme: any) => theme.test, { defaultValue })
    expect(fn({ theme })).toBe(defaultValue)
  })

  test('matchThemeProp should return modified default value given theme prop and a no prop key match', () => {
    const fn = matchThemeProp((theme: any) => theme.test, { modifier, defaultValue })
    expect(fn({ theme })).toBe(modifier(defaultValue))
  })

  test('matchThemeProp should return default value if no theme prop is available and a no prop key match', () => {
    const fn = matchThemeProp((theme: any) => theme.test, { defaultValue })
    expect(fn({})).toBe(defaultValue)
  })

  test('matchThemeProp should return modified default value if no theme prop is available and a no prop key match', () => {
    const fn = matchThemeProp((theme: any) => theme.test, { modifier, defaultValue })
    expect(fn({})).toBe(modifier(defaultValue))
  })
})

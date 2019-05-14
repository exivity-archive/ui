import { getMonth, getQuarter, getYear } from 'date-fns'
import { act, renderHook } from 'react-hooks-testing-library'

import { browseReducer, createBrowsers, formatDateHeader, getNextIndex, useMode } from './helpers'
import { BrowseTypes, Modes } from './types'

describe('browseReducer function', () => {
  test('addMonth adds month', () => {
    const date = new Date(2017, 0, 1)

    const newDate = browseReducer(date, BrowseTypes.ADD_MONTH)
    expect(getMonth(newDate)).toBe(1)
  })

  test('subMonth subs month', () => {
    const date = new Date(2017, 1, 1)

    const newDate = browseReducer(date, BrowseTypes.SUB_MONTH)
    expect(getMonth(newDate)).toBe(0)
  })

  test('addQuarter adds quarter', () => {
    const date = new Date(2017, 0, 1)

    const newDate = browseReducer(date, BrowseTypes.ADD_QUARTER)
    expect(getQuarter(newDate)).toBe(2)
  })

  test('subQuarter subs quarter', () => {
    const date = new Date(2017, 4, 1)

    const newDate = browseReducer(date, BrowseTypes.SUB_QUARTER)
    expect(getQuarter(newDate)).toBe(1)
  })

  test('addYear adds year', () => {
    const date = new Date(2017, 0, 1)

    const newDate = browseReducer(date, BrowseTypes.ADD_YEAR)
    expect(getYear(newDate)).toBe(2018)
  })

  test('subYear subs year', () => {
    const date = new Date(2017, 1, 1)

    const newDate = browseReducer(date, BrowseTypes.SUB_YEAR)
    expect(getYear(newDate)).toBe(2016)
  })

  test('addYears adds 12 years', () => {
    const date = new Date(2017, 0, 1)

    const newDate = browseReducer(date, BrowseTypes.ADD_YEARS)
    expect(getYear(newDate)).toBe(2029)
  })

  test('subYears subs 12 years', () => {
    const date = new Date(2017, 1, 1)

    const newDate = browseReducer(date, BrowseTypes.SUB_YEARS)
    expect(getYear(newDate)).toBe(2005)
  })

  test('throws error', () => {
    expect(browseReducer).toThrow(Error)
  })
})

describe('createBrowsers', () => {
  test('mode days return addMonth and subMonth dispatch', () => {
    const dispatcher = (action: string) => action
    const [prev, next] = createBrowsers(dispatcher, Modes.DAYS)

    const prevAction = prev()
    const nextAction = next()

    expect(prevAction).toBe(BrowseTypes.SUB_MONTH)
    expect(nextAction).toBe(BrowseTypes.ADD_MONTH)
  })

  test('mode months return addYear and subYear dispatch', () => {
    const dispatcher = (action: string) => action
    const [prev, next] = createBrowsers(dispatcher, Modes.MONTHS)

    const prevAction = prev()
    const nextAction = next()

    expect(prevAction).toBe(BrowseTypes.SUB_YEAR)
    expect(nextAction).toBe(BrowseTypes.ADD_YEAR)
  })

  test('mode quarters return addYear and subYear dispatch', () => {
    const dispatcher = (action: string) => action
    const [prev, next] = createBrowsers(dispatcher, Modes.QUARTERS)

    const prevAction = prev()
    const nextAction = next()

    expect(prevAction).toBe(BrowseTypes.SUB_YEAR)
    expect(nextAction).toBe(BrowseTypes.ADD_YEAR)
  })

  test('mode years return addYears and subYears dispatch', () => {
    const dispatcher = (action: string) => action
    const [prev, next] = createBrowsers(dispatcher, Modes.YEARS)

    const prevAction = prev()
    const nextAction = next()

    expect(prevAction).toBe(BrowseTypes.SUB_YEARS)
    expect(nextAction).toBe(BrowseTypes.ADD_YEARS)
  })
})

describe('formatDateHeader', () => {
  const date = new Date(2017, 0, 1)

  test('mode years should be formatted as 2011 - 2022', () => {
    const formattedValue = formatDateHeader(date, Modes.YEARS)

    expect(formattedValue).toBe('2011 - 2022')
  })

  test('mode quarters should format to 2017', () => {
    const formattedValue = formatDateHeader(date, Modes.QUARTERS)

    expect(formattedValue).toBe('2017')
  })

  test('mode months should format to 2017', () => {
    const formattedValue = formatDateHeader(date, Modes.MONTHS)

    expect(formattedValue).toBe('2017')
  })

  test('mode days should format to January 2017', () => {
    const formattedValue = formatDateHeader(date, Modes.DAYS)

    expect(formattedValue).toBe('January 2017')
  })
})

describe('getNextIndex', () => {
  test('return next index if there is one', () => {
    const arr = [1, 2, 3, 4]
    const nextIndex = getNextIndex(1, arr)

    expect(nextIndex).toBe(2)
  })

  test('return 0 if there isnt a next index', () => {
    const arr = [1, 2, 3, 4]
    const nextIndex = getNextIndex(3, arr)

    expect(nextIndex).toBe(0)
  })
})

describe('useMode hook', () => {
  test('only mode as string option', () => {
    const { result } = renderHook(() => useMode(undefined, Modes.YEARS))
    const [mode, selectNext] = result.current

    expect(mode).toBe(Modes.YEARS)
    expect(selectNext).toBe(undefined)
  })

  test('only initialMode', () => {
    const { result } = renderHook(() => useMode(Modes.MONTHS, undefined))
    const [mode, selectNext] = result.current

    expect(mode).toBe(Modes.MONTHS)
    expect(typeof selectNext).toEqual('function')
  })

  test('when calling selectFunction, next mode is returned', () => {
    const { result } = renderHook(() => useMode(Modes.MONTHS, undefined))

    act(() => result.current[1]!())

    expect(result.current[0]).toBe(Modes.QUARTERS)
  })

  test('when calling selectFunction, next mode is returned', () => {
    const { result } = renderHook(() => useMode(Modes.YEARS, [Modes.MONTHS, Modes.YEARS]))

    act(() => result.current[1]!())

    expect(result.current[0]).toBe(Modes.MONTHS)
  })
})

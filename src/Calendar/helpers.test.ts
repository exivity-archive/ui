import { getMonth, getQuarter, getYear } from 'date-fns'
import { browseReducer, createBrowsers } from './helpers'

describe('browseReducer function', () => {
  test('addMonth adds month', () => {
    const date = new Date(2017, 0, 1)

    const newDate = browseReducer(date, 'addMonth')
    expect(getMonth(newDate)).toBe(1)
  })

  test('subMonth subs month', () => {
    const date = new Date(2017, 1, 1)

    const newDate = browseReducer(date, 'subMonth')
    expect(getMonth(newDate)).toBe(0)
  })

  test('addQuarter adds quarter', () => {
    const date = new Date(2017, 0, 1)

    const newDate = browseReducer(date, 'addQuarter')
    expect(getQuarter(newDate)).toBe(2)
  })

  test('subQuarter subs quarter', () => {
    const date = new Date(2017, 4, 1)

    const newDate = browseReducer(date, 'subQuarter')
    expect(getQuarter(newDate)).toBe(1)
  })

  test('addYear adds year', () => {
    const date = new Date(2017, 0, 1)

    const newDate = browseReducer(date, 'addYear')
    expect(getYear(newDate)).toBe(2018)
  })

  test('subYear subs year', () => {
    const date = new Date(2017, 1, 1)

    const newDate = browseReducer(date, 'subYear')
    expect(getYear(newDate)).toBe(2016)
  })

  test('throws error', () => {
    expect(browseReducer).toThrow(Error)
  })
})

describe('createBrowsers', () => {
  test('mode days return addMonth and subMonth dispatch', () => {
    const dispatcher = (action: string) => action
    const [prev, next] = createBrowsers(dispatcher,'days')

    const prevAction = prev()
    const nextAction = next()

    expect(prevAction).toBe('subMonth')
    expect(nextAction).toBe('addMonth')
  })

  test('mode months return addMonth and subMonth dispatch', () => {
    const dispatcher = (action: string) => action
    const [prev, next] = createBrowsers(dispatcher,'months')

    const prevAction = prev()
    const nextAction = next()

    expect(prevAction).toBe('subMonth')
    expect(nextAction).toBe('addMonth')
  })

  test('mode quarters return addQuarter and subQuarter dispatch', () => {
    const dispatcher = (action: string) => action
    const [prev, next] = createBrowsers(dispatcher,'quarters')

    const prevAction = prev()
    const nextAction = next()

    expect(prevAction).toBe('subQuarter')
    expect(nextAction).toBe('addQuarter')
  })

  test('mode years return addYears and subYears dispatch', () => {
    const dispatcher = (action: string) => action
    const [prev, next] = createBrowsers(dispatcher,'years')

    const prevAction = prev()
    const nextAction = next()

    expect(prevAction).toBe('subYear')
    expect(nextAction).toBe('addYear')
  })
})

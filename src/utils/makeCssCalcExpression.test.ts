import { makeCssCalcExpression } from './makeCssCalcExpression'

describe('makeCssCalcExpression(...)', () => {
  test('it returns a calc statement containing all arguments', () => {
    const args = ['1px', '5em', '100%']

    const result = makeCssCalcExpression(...args)

    expect(result).toBe(`calc(1px + 5em + 100%)`)
  })

  test('if only one argument is given it doesn`t wrap it in a calc()', () => {
    const args = ['1px']

    const result = makeCssCalcExpression(...args)

    expect(result).toBe(`1px`)
  })

  test('accepts numbers as well', () => {
    const args = [1, '5em', '100%', 20]

    const result = makeCssCalcExpression(...args)

    expect(result).toBe(`calc(1px + 5em + 100% + 20px)`)
  })

  test('0 and 0px get ignored', () => {
    const args = [0, '5em', '0px', 20]

    const result = makeCssCalcExpression(...args)

    expect(result).toBe(`calc(5em + 20px)`)
  })

  test('returns undefined if no arguments are given', () => {
    const args = []

    const result = makeCssCalcExpression(...args)

    expect(result).toBe('0')
  })
})

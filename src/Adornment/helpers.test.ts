import { makeCssCalcExpression } from './helpers'
import { Position } from './Adornment'

describe('makeCssCalcStatement(...)', () => {
  test('it returns a calc statement containing all arguments', () => {
    const args = ['1px', '5em', '100%']

    const result = makeCssCalcExpression(...args)

    expect(result).toBe(`calc(1px + 5em + 100%)`)
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
})

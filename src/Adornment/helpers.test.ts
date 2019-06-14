import { makeCssCalcExpression, mergeExtraPadding } from './helpers'
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

describe('mergeExtraPadding(...)', () => {
  test('merges the values of all extra paddings into calc statements', () => {
    const extraPaddingA = {
      [Position.LEFT]: '20px',
      [Position.RIGHT]: '4em'
    }

    const extraPaddingB = {
      [Position.LEFT]: '10%',
      [Position.RIGHT]: '4em'
    }

    const args = [extraPaddingA, extraPaddingB]

    const result = mergeExtraPadding(...args)

    expect(result[Position.LEFT]).toBe('calc(20px + 10%)')
    expect(result[Position.RIGHT]).toBe('calc(4em + 4em)')
  })
})

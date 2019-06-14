import { makeCssCalcStatement, mergeExtraPadding } from './helpers'
import { Position } from './Adornment'

describe('makeCssCalcStatement(...)', () => {
  test('it returns a calc statement containing all arguments', () => {
    const args = ['1px', '5em', '100%']

    const result = makeCssCalcStatement(...args)

    expect(result).toBe(`calc(1px + 5em + 100%)`)
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

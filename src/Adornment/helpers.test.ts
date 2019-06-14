import { makeCssCalcStatement } from './helpers'

describe('makeCssCalcStatement(...)', () => {
  test('it returns a calc statement containing all arguments', () => {
    const args = ['1px', '5em', '100%']

    const result = makeCssCalcStatement(...args)

    expect(result).toBe(`calc(1px + 5em + 100%)`)
  })

})

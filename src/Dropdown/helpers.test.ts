import { makeCssPosition } from './helpers'

test('makeCssPosition should return correct css for given inputs', () => {
  const expected1 = 'top: 10px;\nleft: 0px;\n'
  const expected2 = 'bottom: 10px;\nright: 0px;\n'

  expect(makeCssPosition({ horizontal: 'left', vertical: 'top' }, 10)).toBe(expected1)
  expect(makeCssPosition({ horizontal: 'right', vertical: 'bottom' }, 10)).toBe(expected2)
})

import { makeDefaultCSS } from './helpers'
import { Vertical, Horizontal } from '../useSnapEdgeToParent'

test('makeCssPosition should return correct css for given inputs', () => {
  const expected1 = 'bottom: 10px;\nright: 0px;\n'
  const expected2 = 'top: 10px;\nleft: 0px;\n'

  expect(makeDefaultCSS({ horizontal: Horizontal.LEFT, vertical: Vertical.TOP }, 10 as any)).toBe(expected1)
  expect(makeDefaultCSS({ horizontal: Horizontal.RIGHT, vertical: Vertical.BOTTOM }, 10 as any)).toBe(expected2)
})

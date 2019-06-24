import { Positioning } from '../useSnapEdgeToParent'
import { Rect } from '../useClientRect'

export interface DropdownRects {
  trigger: Rect
  content: Rect
}

export const makeDefaultCSS = ({ horizontal, vertical }: Positioning, { trigger }: DropdownRects) =>
  `${vertical}: ${trigger.height}px;\n`
  + `${horizontal}: 0px;\n`

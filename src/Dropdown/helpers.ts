import { Positioning } from '../useSnapEdgeToParent'

export interface Dimensions {
  height: number
  width: number
}

export const makeDefaultCSS = ({ horizontal, vertical }: Positioning, _: Dimensions, { height }: Dimensions) =>
  `${vertical}: ${height}px;\n`
  + `${horizontal}: 0px;\n`

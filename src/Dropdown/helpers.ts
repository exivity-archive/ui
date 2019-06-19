import { Positioning } from '../useSnapEdgeToParent'

export const makeCssPosition = ({ horizontal, vertical }: Positioning, height: number) =>
  `${vertical}: ${height}px;\n`
  + `${horizontal}: 0px;\n`

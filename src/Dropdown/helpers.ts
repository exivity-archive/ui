import { Positioning } from '../useSnapEdgeToParent'

export const makeDefaultCSS = ({ horizontal, vertical }: Positioning, trigger: number) =>
  `${vertical}: ${trigger}px;\n`
  + `${horizontal}: 0px;\n`

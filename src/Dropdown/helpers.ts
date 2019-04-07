import { Layout } from '../useSnapEdgeToParent'

export const makeCssPosition = ({ horizontal, vertical }: Layout, height: number) =>
  `${vertical}: ${height}px;\n`
  + `${horizontal}: 0px;\n`

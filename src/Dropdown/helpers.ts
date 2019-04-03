import { Layout } from '../useEdgeAvoidingLayout/helpers'

export const makeCssPosition = ({ horizontal, vertical }: Layout, height: number) =>
  `${vertical}: ${height}px;\n`
  + `margin-${vertical}: 5px;\n`
  + `${horizontal}: 0px;\n`

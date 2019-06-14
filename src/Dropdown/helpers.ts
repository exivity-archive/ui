import { Layout } from '../useSnapEdgeToParent'

export const makeCssPosition = ({ horizontal, vertical }: Layout, height: number) => {
  horizontal = (horizontal === 'right')
    ? 'left'
    : 'right'

  vertical = (vertical === 'top')
    ? 'bottom'
    : 'top'

  return(
    `${vertical}: ${height}px;\n`
    + `${horizontal}: 0px;\n`
  )
}

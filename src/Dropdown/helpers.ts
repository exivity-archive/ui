import { Layout, Vertical } from '../useSnapEdgeToParent'

export const makeCssPosition = ({ horizontal, vertical }: Layout, height: number) => {
  horizontal = (horizontal === 'right')
    ? 'left'
    : 'right'

  return(
    `${vertical}: ${height}px;\n`
    + `${horizontal}: 0px;\n`
  )
}

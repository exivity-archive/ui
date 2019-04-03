export type Vertical = 'top' | 'bottom'
export type Horizontal = 'left' | 'right'

export interface AutoLayout {
  vertical: Vertical | 'auto'
  horizontal: Horizontal | 'auto'
}

export interface Layout extends AutoLayout {
  horizontal: Horizontal
  vertical: Vertical
}

interface Rects {
  outer: ClientRect | DOMRect
  inner: ClientRect | DOMRect
}

export type BreakDistances = {
  [key in 'vertical' | 'horizontal']: number
}

export const getLayout = (rects: Rects, layout: AutoLayout, breakDistances: BreakDistances): Layout => ({
  vertical: getVertical(layout.vertical, rects, breakDistances),
  horizontal: getHorizontal(layout.horizontal, rects, breakDistances)
})

export function getVertical (vertical: Vertical | 'auto', { outer, inner }: Rects, breakDistances: BreakDistances) {
  if (vertical === 'auto') {
    return elementCrossedEdge(outer.bottom, inner.height, window.innerHeight - breakDistances.vertical)
      ? 'bottom' : 'top'
  } else {
    return vertical
  }
}

export function getHorizontal (horizontal: Horizontal | 'auto', { outer, inner }: Rects, breakDistances: BreakDistances) {
  if (horizontal === 'auto') {
    return elementCrossedEdge(outer.left, inner.width, window.innerWidth - breakDistances.horizontal)
      ? 'right' : 'left'
  } else {
    return horizontal
  }
}

export const elementCrossedEdge = (absolutePosition: number, elementDimension: number, edge: number) => {
  return absolutePosition + elementDimension > edge
}

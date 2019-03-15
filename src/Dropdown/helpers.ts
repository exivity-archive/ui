export interface Rects {
  outer: ClientRect | DOMRect
  inner: ClientRect | DOMRect
}

export type Vertical = 'top' | 'bottom' | 'auto'
export type Horizontal = 'left' | 'right' | 'auto'

export interface Layout {
  horizontal: Horizontal
  vertical: Vertical,
}

const elementCrossedEdge = (absolutePosition: number, elementDimension: number, edge: number) => {
  return absolutePosition + elementDimension > edge
}

function getVertical (vertical: Vertical, { outer, inner }: Rects, breakDistance: number) {
  if (vertical === 'auto') {
    return elementCrossedEdge(outer.bottom, inner.height, window.innerHeight - breakDistance)
      ? 'top' : 'bottom'
  } else {
    return vertical
  }
}

function getHorizontal (horizontal: Horizontal, { outer, inner }: Rects, breakDistance: number) {
  if (horizontal === 'auto') {
    return elementCrossedEdge(outer.left, inner.width, window.innerWidth - breakDistance)
      ? 'left' : 'right'
  } else {
    return horizontal
  }
}

export function getPosition (rects: Rects, layout: Layout, breakDistance: number) {
  const vertical = getVertical(layout.vertical, rects, breakDistance)
  const horizontal = getHorizontal(layout.horizontal, rects, breakDistance)

  const flippedVertical = vertical === 'top' ? 'bottom' : 'top'
  const flippedHorizontal = horizontal === 'left' ? 'right' : 'left'

  return {
    [flippedVertical]: rects.outer.height,
    [flippedHorizontal]: 0
  }
}

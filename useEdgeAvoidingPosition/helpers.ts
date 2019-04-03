export interface Rects {
  outer: ClientRect | DOMRect
  inner: ClientRect | DOMRect
}

export type Vertical = 'top' | 'bottom'
export type Horizontal = 'left' | 'right'

export interface AvoidingLayout {
  horizontal: Horizontal
  vertical: Vertical
}

export type VerticalOrAuto = Vertical | 'auto'
export type HorizontalOrAuto = Horizontal | 'auto'

export interface Layout {
  horizontal: Horizontal | 'auto'
  vertical: Vertical | 'auto',
}

export const elementCrossedEdge = (absolutePosition: number, elementDimension: number, edge: number) => {
  return absolutePosition + elementDimension > edge
}

export function getVertical (vertical: VerticalOrAuto, { outer, inner }: Rects, breakDistance: number) {
  if (vertical === 'auto') {
    return elementCrossedEdge(outer.bottom, inner.height, window.innerHeight - breakDistance)
      ? 'top' : 'bottom'
  } else {
    return vertical
  }
}

export function getHorizontal (horizontal: HorizontalOrAuto, { outer, inner }: Rects, breakDistance: number) {
  if (horizontal === 'auto') {
    return elementCrossedEdge(outer.left, inner.width, window.innerWidth - breakDistance)
      ? 'right' : 'left'
  } else {
    return horizontal
  }
}

export interface Position {
  left?: boolean
  right?: boolean
  top?: number
  bottom?: number
}

export const getPosition = (rects: Rects, layout: Layout, breakDistance: number): AvoidingLayout => ({
  vertical: getVertical(layout.vertical, rects, breakDistance),
  horizontal: getHorizontal(layout.horizontal, rects, breakDistance)
})

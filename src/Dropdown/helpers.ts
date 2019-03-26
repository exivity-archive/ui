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

export const elementCrossedEdge = (absolutePosition: number, elementDimension: number, edge: number) => {
  return absolutePosition + elementDimension > edge
}

export function getVertical (vertical: Vertical, { outer, inner }: Rects, breakDistance: number) {
  if (vertical === 'auto') {
    return elementCrossedEdge(outer.bottom, inner.height, window.innerHeight - breakDistance)
      ? 'top' : 'bottom'
  } else {
    return vertical
  }
}

export function getHorizontal (horizontal: Horizontal, { outer, inner }: Rects, breakDistance: number) {
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

export function getPosition (rects: Rects, layout: Layout, breakDistance: number): Position {
  const vertical = getVertical(layout.vertical, rects, breakDistance)
  const horizontal = getHorizontal(layout.horizontal, rects, breakDistance)

  // horizontal can be a boolean as the value is always 0 in makeCssPosition
  return {
    [vertical]: rects.outer.height,
    [horizontal]: true
  }
}

export function makeCssPosition ({ top, right, bottom, left }: Position) {
  let css = ''
  if (top) css += `bottom: ${top}px;\n` + 'margin-top: 5px;\n'
  if (right) css += `right: 0px;\n`
  if (bottom) css += `top: ${bottom}px;\n` + 'margin-bottom: 5px;\n'
  if (left) css += `left: 0px;\n`
  return css
}

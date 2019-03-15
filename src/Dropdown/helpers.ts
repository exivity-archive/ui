import { RefObject } from 'react'

export interface Refs {
  content: RefObject<HTMLDivElement>
  dropdown: RefObject<HTMLDivElement>
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

interface Rects {
  outer: ClientRect | DOMRect
  inner: ClientRect | DOMRect
}

function getVertical (vertical: Vertical, { outer, inner }: Rects, breakDistance: number) {
  if (vertical === 'auto') {
    return elementCrossedEdge(outer.bottom, inner.height, window.innerHeight - breakDistance)
      ? 'top' : 'bottom'
  }
}

function getHorizontal (horizontal: Horizontal, { outer, inner }: Rects, breakDistance: number) {
  if (horizontal === 'auto') {
    return elementCrossedEdge(outer.left, inner.width, window.innerWidth - breakDistance)
      ? 'left' : 'right'
  }
}

export function getPosition ({ dropdown, content }: Refs, { horizontal, vertical }: Layout, breakDistance: number) {
  if (!content.current || !dropdown.current) return

  const outer = dropdown.current.getBoundingClientRect()
  const inner = content.current.getBoundingClientRect()
  const rects: Rects = { outer, inner }

  const newVertical = getVertical(vertical, rects, breakDistance) || vertical
  const newHorizontal = getHorizontal(horizontal, rects, breakDistance) || horizontal

  if (vertical === 'auto' || horizontal === 'auto') {
    return {
      [newHorizontal === 'left' ? 'right' : 'left']: 0,
      [newVertical === 'top' ? 'bottom' : 'top']: outer.height
    }
  }
}

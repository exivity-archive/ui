import { Rect } from '../useClientRect'

export interface RefAndRectMap {
  target: RefAndRect
  parent: RefAndRect
  container: RefAndRect
}

interface RefAndRect {
  ref: (node: HTMLElement | null) => void
  rect: Rect | null
}

export enum Vertical {
  BOTTOM = 'top',
  TOP = 'bottom',
  AUTO = 'auto'
}

export enum Horizontal {
   LEFT = 'right',
   RIGHT = 'left',
   AUTO = 'auto'
}

export interface AutoPosition {
  vertical?: Vertical
  horizontal?: Horizontal
}

export interface Positioning extends AutoPosition {
  horizontal: Exclude<Horizontal, Horizontal.AUTO>
  vertical: Exclude<Vertical, Vertical.AUTO>
}

export type BreakDistance = {
  horizontal: number
  vertical: number
} | number

const defaultPosition: AutoPosition = { vertical: Vertical.AUTO, horizontal: Horizontal.AUTO }

export function getPositioning (
  { target, parent, container }: RefAndRectMap,
  breakDistance: BreakDistance,
  position: AutoPosition = {}
): Positioning {
  const { vertical, horizontal } = { ...defaultPosition, ...position }
  const { top, left, height, width } = getMeasures(target.rect, parent.rect)
  const { bottomEdge, rightEdge } = getEdges(container.rect, breakDistance)

  const newVertical = top + height > bottomEdge ? Vertical.TOP : Vertical.BOTTOM
  const newHorizontal = left + width > rightEdge ? Horizontal.LEFT : Horizontal.RIGHT

  return {
    vertical: vertical !== Vertical.AUTO ? vertical! : newVertical,
    horizontal: horizontal !== Horizontal.AUTO ? horizontal! : newHorizontal
  }
}

export function getMeasures (targetRect: Rect | null, parentRect: Rect | null) {
  if (targetRect && parentRect) {
    const { width, height } = targetRect
    const { top, left } = parentRect

    return { width, height, top, left }
  } else {
    return { width: 0, height: 0, top: 0, left: 0 }
  }
}

export function getEdges (containerRect: Rect | null, breakDistance: BreakDistance) {
  const { vertical, horizontal } = buildOrUseBreakDistance(breakDistance)

  if (containerRect) {
    let { right, bottom } = containerRect
    return { rightEdge: right - horizontal, bottomEdge: bottom - vertical }
  } else {
    return { rightEdge: window.innerWidth - horizontal, bottomEdge: window.innerHeight - vertical }
  }
}

export function buildOrUseBreakDistance (breakDistance: BreakDistance) {
  return typeof breakDistance === 'number' ? {
    horizontal: breakDistance,
    vertical: breakDistance
  } : breakDistance
}

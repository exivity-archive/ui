import { RefObject } from 'react'

export interface Refs<
  Target extends HTMLElement = HTMLElement,
  Parent extends HTMLElement = HTMLElement,
  Container extends HTMLElement = HTMLElement
  > {
  target: RefObject<Target>
  parent: RefObject<Parent>
  container: RefObject<Container>
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

export interface AutoLayout {
  vertical?: Vertical
  horizontal?: Horizontal
}

export interface Layout extends AutoLayout {
  horizontal: Exclude<Horizontal, Horizontal.AUTO>
  vertical: Exclude<Vertical, Vertical.AUTO>
}

export type BreakDistance = {
  horizontal: number
  vertical: number
} | number

const defaultLayout: AutoLayout = { vertical: Vertical.AUTO, horizontal: Horizontal.AUTO }

export function getLayout (
  { target, parent, container }: Refs,
  breakDistance: BreakDistance,
  layout: AutoLayout = {}
): Layout {
  const { vertical, horizontal } = { ...defaultLayout, ...layout }
  const { top, left, height, width } = getMeasures(target.current, parent.current)
  const { bottomEdge, rightEdge } = getEdges(container.current, breakDistance)

  const newVertical = top + height > bottomEdge ? Vertical.TOP : Vertical.BOTTOM
  const newHorizontal = left + width > rightEdge ? Horizontal.LEFT : Horizontal.RIGHT

  return {
    vertical: vertical !== Vertical.AUTO ? vertical! : newVertical,
    horizontal: horizontal !== Horizontal.AUTO ? horizontal! : newHorizontal
  }
}

export function getMeasures (target: HTMLElement | null, parent: HTMLElement | null) {
  if (target && parent) {
    const { width, height } = target.getBoundingClientRect()
    const { top, left } = parent.getBoundingClientRect()

    return { width, height, top, left }
  } else {
    return { width: 0, height: 0, top: 0, left: 0 }
  }
}

export function getEdges (container: HTMLElement | null, breakDistance: BreakDistance) {
  const { vertical, horizontal } = buildOrUseBreakDistance(breakDistance)

  if (container) {
    let { right, bottom } = container.getBoundingClientRect()
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

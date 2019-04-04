import { RefObject } from 'react'

export interface Refs<
  TargetElement extends HTMLElement = HTMLElement,
  ParentElement extends HTMLElement = HTMLElement,
  ContainerElement extends HTMLElement = HTMLElement
  > {
  target: RefObject<TargetElement>
  parent: RefObject<ParentElement>
  container: RefObject<ContainerElement>
}

export type Vertical = 'top' | 'bottom'
export type Horizontal = 'left' | 'right'

export interface AutoLayout {
  vertical?: Vertical | 'auto'
  horizontal?: Horizontal | 'auto'
}

export interface Layout extends AutoLayout {
  horizontal: Horizontal
  vertical: Vertical
}

export type BreakDistance = {
  horizontal: number
  vertical: number
} | number

const defaultLayout: AutoLayout = { vertical: 'auto', horizontal: 'auto' }

export function getLayout (
  { target, parent, container }: Refs,
  breakDistance: BreakDistance,
  layout: AutoLayout = {}
): Layout {
  const { vertical, horizontal } = { ...defaultLayout, ...layout }
  const { top, left, height, width } = getMeasures(target.current, parent.current)
  const { bottomEdge, rightEdge } = getEdges(container.current, breakDistance)

  const newVertical = top + height > bottomEdge ? 'bottom' : 'top'
  const newHorizontal = left + width > rightEdge ? 'right' : 'left'

  return {
    vertical: vertical !== 'auto' ? vertical! : newVertical,
    horizontal: horizontal !== 'auto' ? horizontal! : newHorizontal
  }
}

export function getMeasures (target: HTMLElement | null, parent: HTMLElement | null) {
  if (target && parent) {
    const { width, height } = target.getBoundingClientRect()
    const { top, left } = parent.getBoundingClientRect()

    return { width, height, top, left }
  } else {
    throw new Error('target and parent refs should always be given to elements')
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

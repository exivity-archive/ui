import { useState, useLayoutEffect, useRef, RefObject } from 'react'
import { Positioning, getPositioning, AutoPosition, BreakDistance, RefAndRectMap, Vertical, Horizontal } from './helpers'
import { useWindowEvent } from '../useWindowEvent'

function getRect(ref: RefObject<HTMLElement>) {
  return ref.current && ref.current!.getBoundingClientRect()
}

export function useSnapEdgeToParent(breakDistances: BreakDistance | number, initialPositioning?: AutoPosition) {
  const targetRef = useRef<HTMLElement>(null)
  const parentRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLElement>(null)

  const refAndRectMap = {
    target: { rect: getRect(targetRef), ref: targetRef },
    parent: { rect: getRect(parentRef), ref: parentRef },
    container: { rect: getRect(containerRef), ref: containerRef }
  }

  const [positioning, setPositioning] = useState({ horizontal: Horizontal.RIGHT, vertical: Vertical.BOTTOM })

  function calculatePositioning() {
    const newPos = getPositioning(refAndRectMap, breakDistances, initialPositioning)
    setPositioning(newPos)
  }

  useLayoutEffect(calculatePositioning, [targetRef.current, parentRef.current])
  useWindowEvent('resize', calculatePositioning)

  return [refAndRectMap, positioning] as [RefAndRectMap, Positioning]
}

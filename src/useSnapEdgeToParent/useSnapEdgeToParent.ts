import { useRef, useState, useMemo, useLayoutEffect } from 'react'
import { Positioning, getPosition, AutoPosition, BreakDistance, Refs, Vertical, Horizontal } from './helpers'

export function useSnapEdgeToParent<
  Target extends HTMLElement = HTMLDivElement,
  Parent extends HTMLElement = HTMLDivElement,
  Container extends HTMLElement = HTMLDivElement
> (
  breakDistances: BreakDistance | number,
  initialPositioning?: AutoPosition
): [Refs<Target, Parent, Container>, Positioning, () => void] {

  const refs = {
    target: useRef<Target>(null),
    parent: useRef<Parent>(null),
    container: useRef<Container>(null)
  }

  const [positioning, setPositioning] = useState<Positioning>({ horizontal: Horizontal.RIGHT, vertical: Vertical.BOTTOM })

  const handlePositioning = () => setPositioning(getPosition(refs, breakDistances, initialPositioning))

  useLayoutEffect(handlePositioning, [])

  return useMemo<[Refs<Target, Parent, Container>, Positioning, () => void]>(() => {
    return [refs, positioning, handlePositioning]
  }, [positioning.horizontal, positioning.vertical])
}

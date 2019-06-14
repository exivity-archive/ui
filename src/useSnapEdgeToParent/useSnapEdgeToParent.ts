import { useRef, useState, useMemo, useLayoutEffect } from 'react'
import { Positioning, getPosition, AutoPosition, BreakDistance, Refs, Vertical, Horizontal } from './helpers'

export function useSnapEdgeToParent<
  Target extends HTMLElement = HTMLDivElement,
  Parent extends HTMLElement = HTMLDivElement,
  Container extends HTMLElement = HTMLDivElement
> (
  breakDistances: BreakDistance | number,
  initialLayout?: AutoPosition
): [Refs<Target, Parent, Container>, Positioning, () => void] {

  const refs = {
    target: useRef<Target>(null),
    parent: useRef<Parent>(null),
    container: useRef<Container>(null)
  }

  const [layout, setLayout] = useState<Positioning>({ horizontal: Horizontal.RIGHT, vertical: Vertical.BOTTOM })

  const handleLayout = () => setLayout(getPosition(refs, breakDistances, initialLayout))

  useLayoutEffect(handleLayout, [])

  return useMemo<[Refs<Target, Parent, Container>, Positioning, () => void]>(() => {
    return [refs, layout, handleLayout]
  }, [layout.horizontal, layout.vertical])
}

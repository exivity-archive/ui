import { useRef, useState, useMemo, useLayoutEffect } from 'react'
import { Layout, getLayout, AutoLayout, BreakDistance, Refs, Vertical, Horizontal } from './helpers'

export function useSnapEdgeToParent<
  Target extends HTMLElement = HTMLDivElement,
  Parent extends HTMLElement = HTMLDivElement,
  Container extends HTMLElement = HTMLDivElement
> (
  breakDistances: BreakDistance | number,
  initialLayout?: AutoLayout
): [Refs<Target, Parent, Container>, Layout, () => void] {

  const refs = {
    target: useRef<Target>(null),
    parent: useRef<Parent>(null),
    container: useRef<Container>(null)
  }

  const [layout, setLayout] = useState<Layout>({ horizontal: Horizontal.RIGHT, vertical: Vertical.BOTTOM })

  const handleLayout = () => setLayout(getLayout(refs, breakDistances, initialLayout))

  useLayoutEffect(handleLayout, [])

  return useMemo<[Refs<Target, Parent, Container>, Layout, () => void]>(() => {
    return [refs, layout, handleLayout]
  }, [layout.horizontal, layout.vertical])
}

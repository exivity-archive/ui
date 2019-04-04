import React, { useRef, useState, useMemo } from 'react'
import { Layout, getLayout, AutoLayout, BreakDistance, Refs } from './helpers'

export function useEdgeAvoidingLayout<
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

  const [layout, setLayout] = useState<Layout>({ horizontal: 'left', vertical: 'top' })

  return useMemo<[Refs<Target, Parent, Container>, Layout, () => void]>(() => {
    const handleLayout = () => setLayout(getLayout(refs, breakDistances, initialLayout))

    return [refs, layout, handleLayout]
  }, [layout.horizontal, layout.vertical])
}

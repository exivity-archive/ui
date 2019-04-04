import React, { useRef, useState, useMemo } from 'react'
import { Layout, getLayout, AutoLayout, BreakDistance, Refs } from './helpers'

export function useEdgeAvoidingLayout<
  TargetElement extends HTMLElement = HTMLDivElement,
  ParentElement extends HTMLElement = HTMLDivElement,
  ContainerElement extends HTMLElement = HTMLDivElement
> (
  breakDistances: BreakDistance | number,
  initialLayout?: AutoLayout
): [Refs<TargetElement, ParentElement, ContainerElement>, Layout, () => void] {

  const refs = {
    target: useRef<TargetElement>(null),
    parent: useRef<ParentElement>(null),
    container: useRef<ContainerElement>(null)
  }

  const [layout, setLayout] = useState<Layout>({ horizontal: 'left', vertical: 'top' })

  return useMemo<[Refs<TargetElement, ParentElement, ContainerElement>, Layout, () => void]>(() => {
    const handleLayout = () => setLayout(getLayout(refs, breakDistances, initialLayout))

    return [refs, layout, handleLayout]
  }, [layout.horizontal, layout.vertical])
}

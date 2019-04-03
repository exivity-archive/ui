import React, { useRef, useState, RefObject } from 'react'
import { Layout, getLayout, AutoLayout, BreakDistances } from './helpers'

interface Refs<
  TargetElement extends HTMLElement,
  ContainerElement extends HTMLElement
  > {
  target: RefObject<TargetElement>
  parent: RefObject<ContainerElement>
}

export function useEdgeAvoidingLayout<
  TargetElement extends HTMLElement = HTMLElement,
  ContainerElement extends HTMLElement = HTMLElement
> (
  breakDistances: BreakDistances | number,
  initialLayout: AutoLayout = { horizontal: 'auto', vertical: 'auto' }
): [Refs<TargetElement, ContainerElement>, () => void, Layout] {

  const refs = {
    target: useRef<TargetElement>(null),
    parent: useRef<ContainerElement>(null)
  }

  const [layout, setLayout] = useState<Layout>({ horizontal: 'left', vertical: 'top' })

  const handleLayout = () => {
    if (refs.target.current && refs.parent.current) {

      const rects = {
        inner: refs.target.current.getBoundingClientRect(),
        outer: refs.parent.current.getBoundingClientRect()
      }

      breakDistances = typeof breakDistances === 'number' ? {
        horizontal: breakDistances,
        vertical: breakDistances
      } : breakDistances

      const newLayout = getLayout(rects, initialLayout, breakDistances)
      setLayout(newLayout)
    }
  }

  return [refs, handleLayout, layout]
}

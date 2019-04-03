import React, { useRef, useState } from 'react'
import { Layout, Rects, getPosition, AvoidingLayout } from './helpers'

export function useEdgeAvoidingPosition (
  breakDistance: number,
  layout: Layout = { horizontal: 'auto', vertical: 'auto' }
) {
  const refs = {
    target: useRef<HTMLElement>(null),
    container: useRef<HTMLElement>(null)
  }
  const [position, setPosition] = useState<AvoidingLayout>({ horizontal: 'left', vertical: 'bottom' })

  const handlePosition = () => {
    if (refs.target.current && refs.container.current) {
      const rects: Rects = {
        inner: refs.container.current.getBoundingClientRect(),
        outer: refs.target.current.getBoundingClientRect()
      }
      const position = getPosition(rects, layout, breakDistance)
      setPosition(position)
    }
  }

  return [refs, handlePosition, position]
}

import { useState, useEffect } from 'react'
import { Positioning, getPositioning, AutoPosition, BreakDistance, RefAndRectMap, Vertical, Horizontal } from './helpers'
import { useClientRect } from '../useClientRect'

export function useSnapEdgeToParent (breakDistances: BreakDistance | number, initialPositioning?: AutoPosition) {
  const [targetRect, targetRef, targetNode] = useClientRect()
  const [parentRect, parentRef, parentNode] = useClientRect()
  const [containerRect, containerRef, containerNode] = useClientRect()

  const refAndRectMap = {
    target: { rect: targetRect, ref: targetRef },
    parent: { rect: parentRect, ref: parentRef },
    container: { rect: containerRect, ref: containerRef }
  }

  const [positioning, setPositioning] = useState({ horizontal: Horizontal.RIGHT, vertical: Vertical.BOTTOM })

  function calculatePositioning () {
    const newPos = getPositioning(refAndRectMap, breakDistances, initialPositioning)
    setPositioning(newPos)
  }

  useEffect(calculatePositioning, [targetNode, parentNode, containerNode])

  useEffect(() => {
    window.addEventListener('resize', calculatePositioning)
    return () => window.removeEventListener('resize', calculatePositioning)
  }, [calculatePositioning])

  return [refAndRectMap, positioning] as [RefAndRectMap, Positioning]
}

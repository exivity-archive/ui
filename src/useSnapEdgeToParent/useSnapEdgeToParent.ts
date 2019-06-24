import { useState, useMemo, useLayoutEffect, useEffect } from 'react'
import { Positioning, getPositioning, AutoPosition, BreakDistance, RefAndRectMap, Vertical, Horizontal } from './helpers'
import { useClientRect }from '../useClientRect'

export function useSnapEdgeToParent (breakDistances: BreakDistance | number, initialPositioning?: AutoPosition) {
  const [targetRect, targetRef] = useClientRect()
  const [parentRect, parentRef] = useClientRect()
  const [containerRect, containerRef] = useClientRect()

  const refAndRectMap = {
    target: { rect: targetRect, ref: targetRef },
    parent: { rect: parentRect, ref: parentRef },
    container: { rect: containerRect, ref: containerRef }
  }

  const [positioning, setPositioning] = useState<Positioning>({ horizontal: Horizontal.RIGHT, vertical: Vertical.BOTTOM })

  const reculculatePositioning = () => setPositioning(getPositioning(refAndRectMap, breakDistances, initialPositioning))

  useLayoutEffect(reculculatePositioning, [])

  useEffect(() => {
    window.addEventListener('resize', reculculatePositioning)
    return () => window.removeEventListener('resize', reculculatePositioning)
  }, [])

  return useMemo(() => {
    return [refAndRectMap, positioning] as [RefAndRectMap, Positioning]
  }, [positioning.horizontal, positioning.vertical])
}

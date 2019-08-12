import { useState, useMemo, useLayoutEffect, useCallback } from 'react'
import { Positioning, getPositioning, AutoPosition, BreakDistance, RefAndRectMap, Vertical, Horizontal } from './helpers'
import { useClientRect } from '../useClientRect'
import { useWindowListener } from '../useWindowListener'

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

  const calculatePositioning = useCallback(
    () => setPositioning(getPositioning(refAndRectMap, breakDistances, initialPositioning)),
    [targetRect, parentRect, containerRect, breakDistances])

  useLayoutEffect(calculatePositioning, [])
  useWindowListener('resize', calculatePositioning)

  return useMemo(() => {
    return [refAndRectMap, positioning] as [RefAndRectMap, Positioning]
  }, [positioning, targetRect, parentRect, containerRect, targetRef, parentRef, containerRef])
}

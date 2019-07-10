import { useState, useMemo, useLayoutEffect, useEffect, useCallback } from 'react'
import { Positioning, getPositioning, AutoPosition, BreakDistance, RefAndRectMap, Vertical, Horizontal } from './helpers'
import { useClientRect } from '../useClientRect'

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

  useEffect(() => {
    window.addEventListener('resize', calculatePositioning)
    return () => window.removeEventListener('resize', calculatePositioning)
  }, [calculatePositioning])

  return useMemo(() => {
    return [refAndRectMap, positioning] as [RefAndRectMap, Positioning]
  }, [positioning, targetRect, parentRect, containerRect, targetRef, parentRef, containerRef])
}

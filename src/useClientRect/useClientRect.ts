import { useState, useCallback } from 'react'

export function useClientRect () {
  const [rect, setRect] = useState<null | ClientRect | DOMRect>(null)

  const ref = useCallback((node: HTMLElement) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect())
    }
  }, [])

  return [rect, ref] as [typeof rect, typeof ref]
}

import { useState, useCallback } from 'react'

export type Rect = ClientRect | DOMRect

export function useClientRect () {
  const [rect, setRect] = useState<Rect | null>(null)

  const ref = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect())
    }
  }, [])

  return [rect, ref] as [Rect | null , typeof ref]
}

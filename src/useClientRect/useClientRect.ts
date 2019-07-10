import { useState, useCallback } from 'react'

export type Rect = ClientRect | DOMRect

export function useClientRect () {
  const [node, setNode] = useState<HTMLElement | null>(null)

  const ref = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      setNode(node)
    }
  }, [])

  const rect = node
    ? node.getBoundingClientRect()
    : null

  return [rect, ref] as [Rect | null, typeof ref]
}

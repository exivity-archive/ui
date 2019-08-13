import { useRef, useCallback } from 'react'
import { useWindowListener } from '../useWindowListener'

export function useOutsideClickListener (onOutsideClick: Function, node: HTMLDivElement | null = null) {
  const ref = useRef<HTMLDivElement>(node)

  const handleOutsideClick: EventListener = useCallback((event: any) => {
    if (!event.target) {
      onOutsideClick(event)
      return ref
    }

    if (ref.current && !ref.current.contains(event.target)) {
      onOutsideClick(event)
    }
  }, [onOutsideClick, node])

  useWindowListener('click', handleOutsideClick, true)

  return ref
}

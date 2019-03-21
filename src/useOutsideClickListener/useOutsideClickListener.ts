import { useEffect, useRef } from 'react'

export function useOutsideClickListener (onOutsideClick: Function, node: HTMLDivElement | null = null) {
  const ref = useRef<HTMLDivElement>(node)

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, true)
    return () => {
      document.removeEventListener('click', handleOutsideClick, true)
    }
  })

  const handleOutsideClick: EventListener = (event: any) => {
    if (!event.target) {
      onOutsideClick(event)
      return ref
    }

    if (ref.current && !ref.current.contains(event.target)) {
      onOutsideClick(event)
    }
  }

  return ref
}

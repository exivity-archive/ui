import { useEffect } from 'react'

export function useWindowListener(event: keyof WindowEventMap, handler: () => void) {
  useEffect(() => {
    window.addEventListener(event, handler)
    return () => window.removeEventListener(event, handler)
  }, [event, handler])
}


import { useEffect } from 'react'

export function useWindowListener (
  event: keyof WindowEventMap,
  handler: EventListener,
  options?: boolean | EventListenerOptions
) {
  useEffect(() => {
    window.addEventListener(event, handler, options)
    return () => window.removeEventListener(event, handler, options)
  }, [event, handler, options])
}

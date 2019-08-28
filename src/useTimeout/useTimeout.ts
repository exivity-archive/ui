import { useEffect, useRef } from 'react'

export function useTimeout (callback: Function, delay: number) {
  const savedCallback = useRef<Function>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const timeoutId = setTimeout(savedCallback.current, delay)
    return () => clearTimeout(timeoutId)
  }, [delay])
}

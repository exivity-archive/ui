import { useEffect } from 'react'

export function useWindowListener (...args: Parameters<typeof window.addEventListener>) {
  useEffect(() => {
    window.addEventListener(...args)
    return () => window.removeEventListener(...args)
  }, [...args])
}

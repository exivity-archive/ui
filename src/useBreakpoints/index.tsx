import { useEffect, useState } from 'react'

import { useStyledTheme, ThemeResolver } from '../utils/styled'
import { Theme } from '../themes'

interface Breaks {
  [key: string]: any
}

type BreakPointIndex = number

const DEFAULT_BREAKS = ['40em', '52em', '64em']
const DEFAULT_RESOLVER = ({ breakpoints }: Theme) => breakpoints || DEFAULT_BREAKS

export function useBreakpoint (themeResolver: ThemeResolver = DEFAULT_RESOLVER): BreakPointIndex {
  const breakpoints = useStyledTheme(themeResolver)
  const [activeBreakPointIndex, setIndex] = useState(getInitialValue(breakpoints))

  useEffect(() => {
    const breaks: Breaks = {}
    const handlers = [
      createMatchQuery(() => setIndex(0)),
      createMatchQuery(() => setIndex(1)),
      createMatchQuery(() => setIndex(2))
    ]

    breakpoints.forEach((breakPoint: string, index: number) => {
      breaks[index] = matchMediaBreak(breakpoints[index])
      breaks[index].addListener(handlers[index])
    })

    return () => {
      breakpoints.forEach((breakPoint: string, index: number) => {
        breaks[index].removeListener(handlers[index])
      })
    }
  }, [])

  return activeBreakPointIndex
}

function matchMediaBreak (breakpoint: string) {
  return window.matchMedia(`(min-width: ${breakpoint})`)
}

function createMatchQuery (setValue: any) {
  return function matchQuery (mediaQuery: any) {
    if (mediaQuery.matches) {
      setValue()
    }
  }
}

function getInitialValue (breakpoints: string[]) {
  let initialIndex = 0

  breakpoints.forEach((breakPoint: string, index: number) => {
    if (matchMediaBreak(breakPoint).matches) {
      initialIndex = index
    }
  })

  return initialIndex
}

import { createContext, useContext } from 'react'

export interface TabsContextShape {
  activeIndex: number
  setActiveIndex: (index: number) => void
  disabledTabs: number[]
}

export const TabsContext = createContext<TabsContextShape | null>(null)

export const useTabsContext = () => {
  const context = useContext(TabsContext)

  if (context) return context
  else throw new Error('useTabsContext should only be called within a child of a Tabs component')
}

export function getNextNonDisabledIndex (activeIndex: number, tabAmount: number, disabledTabs: number[]) {
  let nextActiveIndex: number = activeIndex + 1
  while (true) {
    if (disabledTabs.includes(nextActiveIndex)) nextActiveIndex++
    else if (nextActiveIndex >= tabAmount) nextActiveIndex = 0
    else return nextActiveIndex
  }
}

export function getPrevNonDisabledIndex (activeIndex: number, tabAmount: number, disabledTabs: number[]) {
  let nextActiveIndex: number = activeIndex - 1
  while (true) {
    if (disabledTabs.includes(nextActiveIndex)) nextActiveIndex--
    else if (nextActiveIndex < 0) nextActiveIndex = tabAmount - 1
    else return nextActiveIndex
  }
}

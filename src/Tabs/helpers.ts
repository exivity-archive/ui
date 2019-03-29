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

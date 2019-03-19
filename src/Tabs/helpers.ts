import { createContext, useContext } from 'react'

export interface TabsContextShape {
  activeIndex: number
  setActiveIndex: (index: number) => void
}

export const TabsContext = createContext<TabsContextShape | null>(null)

export const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs compound components must be rendered within the Tabs component')
  }
  return context
}

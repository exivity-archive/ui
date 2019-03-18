import { createContext, useContext } from 'react'

export interface TabsContextShape {
  initialized: boolean
  activeIndex: number
  setActiveIndex: (index: number) => void
}

export const TabsContext = createContext<TabsContextShape>({
  initialized: false,
  activeIndex: 0,
  setActiveIndex: x => undefined
})

export const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context.initialized) {
    throw new Error('Tabs compound components must be rendered within the Tabs component')
  }
  return context
}

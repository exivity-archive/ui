import { createContext, useContext } from 'react'

export interface BoxContextShape {
  collapsed: boolean
  setCollapsed: (newValue: boolean) => void
  collapsible: boolean
  setCollapsible: (newValue: boolean) => void
}

export const BoxContext = createContext<BoxContextShape | null>(null)

export function useBoxContext () {
  const context = useContext(BoxContext)

  if (context) return context
  else throw new Error('useBoxContext should only be called within a child of a Box component')
}

import { createContext, useContext } from 'react'

export interface CollapsibleContextShape {
  collapsed: boolean
  setCollapsed: (newValue: boolean) => void
  collapsible: boolean
}

export const CollapsibleContext = createContext<CollapsibleContextShape | null>(null)

export function useCollapsibleContext () {
  const context = useContext(CollapsibleContext)

  if (context) {
    return context
  } else {
    throw new Error(
      'useCollapsibleContext should only be called within a child of a CollapsibleContainer component.'
      + 'e.g. Group or Box'
    )
  }
}

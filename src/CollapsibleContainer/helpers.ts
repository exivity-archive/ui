import { createContext } from 'react'

export interface CollapsibleContextShape {
  collapsed: boolean
  setCollapsed: (newValue: boolean) => void
}

export const CollapsibleContext = createContext<CollapsibleContextShape | null>(null)

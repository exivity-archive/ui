import { createContext } from 'react'

export interface CollapsibleContextShape {
  collapsed: boolean
  onCollapse: (newValue: boolean) => void
}

export const CollapsibleContext = createContext<CollapsibleContextShape | null>(null)

import { createContext, useContext } from 'react'

export interface GroupContextShape {
  collapsed?: boolean
  toggleCollapse?: () => void
}

export const GroupContext = createContext<GroupContextShape | null>(null)

export function useGroupContext () {
  const context = useContext(GroupContext)

  if (!context) {
    throw new Error('useGroupContext should only be called within a child of a Group component')
  }

  return context
}

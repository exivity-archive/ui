import React from 'react'
import { handleKeyDownFocusListItem } from './helpers'

export const ListFocus: React.FC = ({ children }) => (
  <div onKeyDown={handleKeyDownFocusListItem}>
    {children}
  </div>
)

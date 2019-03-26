import React from 'react'

import { handleKeyDownFocusListItem } from './helpers'

export const ListFocus: React.FC = ({ children, ...rest }) => (
  <div onKeyDown={handleKeyDownFocusListItem} {...rest}>
    {children}
  </div>
)

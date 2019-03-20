import React from 'react'
import styled from 'styled-components'

import { handleKeyDownFocusListItem } from './helpers'

const StyledDiv = styled.div`
  height: 100%;
  width: 100%;
`

export const ListFocus: React.FC = ({ children }) => (
  <StyledDiv onKeyDown={handleKeyDownFocusListItem}>
    {children}
  </StyledDiv>
)

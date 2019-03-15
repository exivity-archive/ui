import React from 'react'
import styled from 'styled-components'

import { fromTheme, matchThemeProp } from '../utils/styled'

const StyledLi = styled.li`
  display: flex;
  align-items: center;

  font-family: ${fromTheme(theme => theme.global.fontFamily)};
  font-weight: 500;
  font-size: ${matchThemeProp(theme => theme.global.sizes, {
    modifier: (em: number) => em / 16 * 14
  })}em;

  &:hover, :focus {
    background-color: ${fromTheme(theme => theme.colours.lightGray)};
  }

  outline: none;
  cursor: pointer;
`

const StyledInnerItem = styled.div`
  display: flex;
  padding: 0 20px;
`

export const focusElement = (event: any) => {
  event.target.focus()
}

export const ListItem: React.FC = ({ children, ...rest }) => (
  <StyledLi {...rest} onMouseOver={focusElement}>
    <StyledInnerItem>
      {children}
    </StyledInnerItem>
  </StyledLi>
)

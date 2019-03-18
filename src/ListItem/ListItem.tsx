import React, { HtmlHTMLAttributes } from 'react'
import styled from 'styled-components'
import { ListChildComponentProps } from 'react-window'

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
  width: 100%;
  height: 100%;
  padding: 0 20px;
`

export const focusElement = (event: any) => event.currentTarget.focus()

export const CenterText = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`

interface ListItemProps extends HtmlHTMLAttributes<HTMLLIElement> {
  style?: React.CSSProperties
  tabIndex?: number
  focusable?: boolean
}

export const ListItem: React.FC<ListItemProps> = ({ children, focusable = true, ...rest }) => (
  <StyledLi {...rest} onMouseOver={focusElement} tabIndex={focusable ? -1 : undefined}>
    <StyledInnerItem>
      {children}
    </StyledInnerItem>
  </StyledLi>
)

ListItem.displayName = 'ListItem'

import React, { HtmlHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

import { fromTheme, matchThemeProp } from '../utils/styled'

const StyledLi = styled.li<ListItemProps>`
  display: flex;
  align-items: center;

  font-family: ${fromTheme(theme => theme.global.fontFamily)};
  font-weight: 500;
  font-size: ${matchThemeProp(theme => theme.global.sizes, {
    modifier: (em: number) => em / 16 * 14
  })}em;

  outline: none;

  ${props => props.noDataPlaceholder
    ? css`
      color: ${fromTheme(theme => theme.colours.gray)};
    `
    : css`
      &:hover, :focus {
       background-color: ${fromTheme(theme => theme.colours.lightGray)};
      }
      cursor: pointer;
    `}
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
  noDataPlaceholder?: boolean
}

export const ListItem: React.FC<ListItemProps> = ({ children, focusable = true, ...rest }) => (
  <StyledLi {...rest} onMouseOver={focusElement} tabIndex={focusable ? -1 : undefined}>
    <StyledInnerItem>
      {children}
    </StyledInnerItem>
  </StyledLi>
)

ListItem.displayName = 'ListItem'

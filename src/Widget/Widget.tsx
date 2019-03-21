import * as React from 'react'
import styled from 'styled-components'

import { fromTheme, hexToString, StyledProps } from '../utils/styled'
import { Heading } from '../Heading'

interface StyledWidgetProps {
  noPadding?: boolean
}

const StyledWidget = styled.div<StyledWidgetProps>`
  background: white;
  box-shadow: 1px 1px 0 rgba(${fromTheme(theme => hexToString(theme.global.purposes.primary))},0.4);
  padding: ${({ noPadding }) => noPadding ? 0 : fromTheme(theme => theme.global.baseSpacing * 1.5)}em;
  position: relative;
  box-sizing: border-box;
  border-radius: 3px;
  width: 100%;
`

interface HeaderProps {
  padding?: boolean
}

const Header = styled.div<HeaderProps>`
  padding: ${({ padding }) => padding ? fromTheme(theme => theme.global.baseSpacing * 1.5) : 0}em;
`

interface WidgetProps extends StyledProps {
  header?: string
  noPadding?: boolean
}

export const Widget: React.FC<WidgetProps> = ({ children, header, noPadding }) => (
  <StyledWidget noPadding={noPadding}>
    {header && (
      <Header padding={noPadding}>
        <Heading>{header}</Heading>
      </Header>
    )}
    {children}
  </StyledWidget>
)

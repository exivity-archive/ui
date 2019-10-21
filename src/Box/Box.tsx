import React, { FC, useContext } from 'react'
import styled, { css } from 'styled-components'

import { fromTheme } from '../utils/styled'
import {
  CollapsibleContainer,
  CollapsibleContainerSubComponents,
  CollapsibleContainerProps,
  CollapsibleContext
} from '../CollapsibleContainer'

interface StyledBoxBarProps {
  collapsible: boolean
}

export const StyledBoxBar = styled.div<StyledBoxBarProps>`
  display: flex;
  box-sizing: border-box;
  background-color: #F4F4F4;
  height: 60px;
  align-items: center;
  padding: 0 ${fromTheme(
    theme => theme.global.baseSpacing * 2
  )}em 0 ${fromTheme(theme => theme.global.baseSpacing)}em;

  ${({ collapsible }) => collapsible && css`
    justify-content: space-between;
  `}
`

export const BoxBar: FC = ({ children }) => {
  const context = useContext(CollapsibleContext)
  return (
    <StyledBoxBar collapsible={!!context}>
      {children}
      <CollapsibleContainer.Collapser />
    </StyledBoxBar>
  )
}

const StyledBoxContent = styled.div`
  padding: 0 ${fromTheme(theme => theme.global.baseSpacing)}em;
`

export const BoxContent: FC = ({ children }) => (
  <StyledBoxContent>
    <CollapsibleContainer.Content>
      {children}
    </CollapsibleContainer.Content>
  </StyledBoxContent>
)

interface StyledBoxProps {
  collapsed: boolean
}

export const StyledBox = styled.div<StyledBoxProps>`
  box-sizing: border-box;
  width: 100%;
  margin: 10px 0;
  border: 2px solid #F4F4F4;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;

  ${({ collapsed }) => collapsed && css`
    height: 62px;
    border-radius: 3px;
  `}
`

interface BoxSubComponents extends CollapsibleContainerSubComponents {
  Bar: typeof BoxBar
}

type BoxProps = CollapsibleContainerProps

const BoxWrapper: FC = ({ children }) => {
  const context = useContext(CollapsibleContext)
  return (
    <StyledBox collapsed={context ? context.collapsed : false}>
      {children}
    </StyledBox>
  )
}

export const Box: FC<BoxProps> & BoxSubComponents = ({ children, ...rest }) => {
  const recievesStateProps = rest.collapsed !== undefined || rest.initialCollapsed !== undefined
  return (
    <CollapsibleContainer {...rest} collapsible={recievesStateProps}>
      <BoxWrapper>{children}</BoxWrapper>
    </CollapsibleContainer>
  )
}

Box.Bar = BoxBar
Box.Content = BoxContent
Box.Collapser = CollapsibleContainer.Collapser

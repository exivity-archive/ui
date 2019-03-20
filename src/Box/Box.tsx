import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { fromTheme } from '../utils/styled'
import {
  CollapsibleContainer,
  useCollapsibleContext,
  CollapsibleContainerSubComponents,
  CollapsibleContainerProps
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
  padding: 0 ${fromTheme(theme => theme.global.spacing * 2)}em 0 ${fromTheme(theme => theme.global.spacing)}em;

  ${({ collapsible }) => collapsible && css`
    justify-content: space-between;
  `}
`

export const BoxBar: FC = ({ children }) => {
  const { collapsible } = useCollapsibleContext()
  return (
    <StyledBoxBar collapsible={collapsible}>
      {children}
      <CollapsibleContainer.Collapser />
    </StyledBoxBar >
  )
}

const StyledBoxContent = styled.div`
  padding: 0 ${fromTheme(theme => theme.global.spacing)};
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

interface BoxProps extends CollapsibleContainerProps { }

const BoxWrapper: FC = ({ children }) => {
  const { collapsed } = useCollapsibleContext()

  return (
    <StyledBox collapsed={collapsed}>
      {children}
    </StyledBox>
  )
}

export const Box: FC<BoxProps> & BoxSubComponents = ({ children, ...rest }) => (
  <CollapsibleContainer {...rest}>
    <BoxWrapper>{children}</BoxWrapper>
  </CollapsibleContainer>
)

Box.Bar = BoxBar
Box.Content = BoxContent
Box.Collapser = CollapsibleContainer.Collapser

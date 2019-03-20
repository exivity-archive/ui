import React, { FC, useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { fromTheme } from '../utils/styled'
import { Icon } from '../Icon'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { useBoxContext, BoxContext, BoxContextShape } from './helpers'
import { useIsUncontrolled } from '../useIsUncontrolled'

export const BoxCollapser = styled(Icon)`
  cursor: pointer;
  user-select: none;
`

interface StyledBoxBarProps {
  collapsible: boolean
}

export const StyledBoxBar = styled.div<StyledBoxBarProps>`
  display: flex;
  box-sizing: border-box;
  background-color: #F4F4F4;
  height: 60px;
  align-items: center;
  padding: 0 ${fromTheme(theme => theme.global.spacing)}em 0 ${fromTheme(theme => theme.global.spacing)}em;

  ${({ collapsible }) => collapsible && css`
    justify-content: space-between;
  `}
`

export const BoxBar: FC = ({ children }) => {
  const { collapsed, setCollapsed, collapsible } = useBoxContext()
  function toggleCollapsed () {
    setCollapsed(!collapsed)
  }

  console.log(collapsible)

  return (
    <StyledBoxBar collapsible={collapsible}>
      {children}
      {collapsible &&
        <BoxCollapser onClick={toggleCollapsed} data-test='box-collapser'>
          {collapsed ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
        </BoxCollapser>
      }
    </StyledBoxBar >
  )
}

const StyledBoxContent = styled.div`
  padding: 0 ${fromTheme(theme => theme.global.spacing)};
`

export const BoxContent: FC = ({ children }) => {
  const { collapsed } = useBoxContext()
  if (collapsed) return null

  return (
    <StyledBoxContent>
      {children}
    </StyledBoxContent>
  )
}

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

interface BoxSubComponents {
  Bar: typeof BoxBar
  Content: typeof BoxContent
}

interface BoxProps {
  initialCollapsed?: boolean
  collapsed?: boolean
  onCollapse?: (newValue: boolean) => void
}

export const Box: FC<BoxProps> & BoxSubComponents = ({ children, ...rest }) => {
  const defaultCollapsed = false
  const initialCollapsed = rest.initialCollapsed !== undefined ? rest.initialCollapsed : defaultCollapsed
  const recievesStateProps = rest.collapsed !== undefined || rest.initialCollapsed !== undefined

  const [collapsed, setCollapsed] = useIsUncontrolled(initialCollapsed, rest.collapsed, rest.onCollapse)
  const [collapsible, setCollapsible] = useState(recievesStateProps)

  const boxContext: BoxContextShape = {
    collapsed,
    setCollapsed,
    collapsible,
    setCollapsible
  }

  return (
    <BoxContext.Provider value={boxContext}>
      <StyledBox collapsed={boxContext.collapsed}>
        {children}
      </StyledBox>
    </BoxContext.Provider >
  )
}

Box.Bar = BoxBar
Box.Content = BoxContent

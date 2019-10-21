import React, { FC, useContext } from 'react'
import styled from 'styled-components'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'

import { Icon } from '../Icon'
import { fromTheme } from '../utils/styled'
import { useIsUncontrolled } from '../useIsUncontrolled'

import { CollapsibleContext } from './helpers'

const StyledContainerCollapser = styled(Icon)`
  cursor: pointer;
  user-select: none;
  font-size: 22px;
  width: 0;
`
const ContainerCollapser: FC = ({ children }) => {
  const context = useContext(CollapsibleContext)
  if (!context) return null

  const { collapsed, onCollapse } = context
  const toggleCollapse = () => onCollapse(!collapsed)

  return (
    <StyledContainerCollapser data-test='container-collapser' onClick={toggleCollapse}>
      {children || collapsed ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
    </StyledContainerCollapser>
  )
}

const StyledContainerContent = styled.div`
  font-family: ${fromTheme(theme => theme.global.fontFamily)};
`
const ContainerContent: FC = ({ children }) => {
  const context = useContext(CollapsibleContext)
  return !context || !context.collapsed ? <StyledContainerContent>{children}</StyledContainerContent> : null
}

export interface CollapsibleContainerSubComponents {
  Content: typeof ContainerContent
  Collapser: typeof ContainerCollapser
}

export interface CollapsibleContainerProps {
  initialCollapsed?: boolean
  collapsed?: boolean
  onCollapse?: (newValue: boolean) => void
  collapsible?: boolean
}

export type CollapsibleContainerComponent = FC<CollapsibleContainerProps> & CollapsibleContainerSubComponents

export const CollapsibleContainer: CollapsibleContainerComponent = ({
  children,
  collapsible = true,
  initialCollapsed = false,
  ...rest
}) => {
  const [collapsed, onCollapse] = useIsUncontrolled(initialCollapsed, rest.collapsed, rest.onCollapse)
  const collapsableContext = { collapsed, onCollapse }
  return (
    <CollapsibleContext.Provider value={collapsible ? collapsableContext : null}>
      {children}
    </CollapsibleContext.Provider>
  )
}

CollapsibleContainer.Content = ContainerContent
CollapsibleContainer.Collapser = ContainerCollapser

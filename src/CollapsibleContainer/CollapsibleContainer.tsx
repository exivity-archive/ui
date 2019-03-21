import React, { FC, useContext } from 'react'
import styled from 'styled-components'
import { Icon } from '../Icon'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { CollapsibleContextShape, CollapsibleContext } from './helpers'
import { fromTheme } from '../utils/styled'
import { useIsUncontrolled } from '../useIsUncontrolled'

const StyledContainerCollapser = styled(Icon)`
  cursor: pointer;
  user-select: none;
  font-size: 22px;
  width: 0;
`
const ContainerCollapser: FC = ({ children }) => {
  const context = useContext(CollapsibleContext)
  if (!context) return null

  const { collapsed, setCollapsed } = context
  const toggleCollapse = () => setCollapsed(!collapsed)

  return (
    <StyledContainerCollapser onClick={toggleCollapse} data-test='container-collapser'>
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

export const CollapsibleContainer: FC<CollapsibleContainerProps> & CollapsibleContainerSubComponents = ({ children, collapsible = true, ...rest }) => {
  const defaultCollapsed = false
  const initialCollapsed = rest.initialCollapsed !== undefined ? rest.initialCollapsed : defaultCollapsed

  const [collapsed, setCollapsed] = useIsUncontrolled(initialCollapsed, rest.collapsed, rest.onCollapse)

  const collapsableContainerContext: CollapsibleContextShape = {
    collapsed,
    setCollapsed
  }

  return (
    <CollapsibleContext.Provider value={collapsible ? collapsableContainerContext : null}>
      {children}
    </CollapsibleContext.Provider>
  )
}

CollapsibleContainer.Content = ContainerContent
CollapsibleContainer.Collapser = ContainerCollapser

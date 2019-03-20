import React, { FC } from 'react'
import styled from 'styled-components'
import { Icon } from '../Icon'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { useCollapsibleContext, CollapsibleContextShape, CollapsibleContext } from './helpers'
import { fromTheme } from '../utils/styled'
import { useIsUncontrolled } from '../useIsUncontrolled'

const StyledContainerCollapser = styled(Icon)`
  cursor: pointer;
  user-select: none;
  font-size: 22px;
  width: 0;
`
const ContainerCollapser: FC = ({ children }) => {
  const { setCollapsed, collapsed, collapsible } = useCollapsibleContext()

  const toggleCollapse = () => setCollapsed(!collapsed)
  return collapsible ? (
    <StyledContainerCollapser onClick={toggleCollapse} data-test='container-collapser'>
      {children || collapsed ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
    </StyledContainerCollapser>
  ) : null
}

const StyledContainerContent = styled.div`
  font-family: ${fromTheme(theme => theme.global.fontFamily)};
`
const ContainerContent: FC = ({ children }) => {
  const { collapsed } = useCollapsibleContext()
  return collapsed ? null : <StyledContainerContent>{children}</StyledContainerContent>
}

export interface CollapsibleContainerSubComponents {
  Content: typeof ContainerContent
  Collapser: typeof ContainerCollapser
}

export interface CollapsibleContainerProps {
  initialCollapsed?: boolean
  collapsed?: boolean
  onCollapse?: (newValue: boolean) => void
}

export const CollapsibleContainer: FC<CollapsibleContainerProps> & CollapsibleContainerSubComponents = ({ children, ...rest }) => {
  const defaultCollapsed = false
  const initialCollapsed = rest.initialCollapsed !== undefined ? rest.initialCollapsed : defaultCollapsed
  const recievesStateProps = rest.collapsed !== undefined || rest.initialCollapsed !== undefined

  const [collapsed, setCollapsed] = useIsUncontrolled(initialCollapsed, rest.collapsed, rest.onCollapse)

  const collapsableContainerContext: CollapsibleContextShape = {
    collapsed,
    setCollapsed,
    collapsible: recievesStateProps
  }

  return <CollapsibleContext.Provider value={collapsableContainerContext}>{children}</CollapsibleContext.Provider>
}

CollapsibleContainer.Content = ContainerContent
CollapsibleContainer.Collapser = ContainerCollapser

import React, { FC, useState } from 'react'
import { Heading } from '../Heading'
import styled from 'styled-components'
import { Icon } from '../Icon'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { useGroupContext, GroupContextShape, GroupContext } from './helpers'
import { fromTheme } from '../utils/styled'

const GroupSeparator = styled.hr`
  width: 100%;
  height: 0;
  margin: 20px 20px;
`

const GroupTitle = styled.span`
  font-size: 28px;
  color: ${fromTheme(theme => theme.colours.gray)};
  margin: 0;
`

const GroupIcon = styled(Icon)`
  margin-top: 8px;
`

const StyledGroupCollapser = styled(GroupIcon)`
  cursor: pointer;
  user-select: none;
  font-size: 16px;
  width: 0;
`

const GroupCollapser: FC = () => {
  const { toggleCollapse, collapsed } = useGroupContext()
  return (
    <StyledGroupCollapser onClick={toggleCollapse} data-test='group-collapser'>
      {collapsed ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
    </StyledGroupCollapser>
  )
}

const StyledGroupHeader = styled(Heading)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`

const GroupHeader: FC = ({ children }) => (
  <StyledGroupHeader>{children}</StyledGroupHeader>
)

const GroupContent: FC = ({ children }) => {
  const { collapsed } = useGroupContext()
  return collapsed ? null : <div>{children}</div>
}

interface GroupSubComponents {
  Header: typeof GroupHeader
  Title: typeof GroupTitle
  Separator: typeof GroupSeparator
  Icon: typeof GroupIcon
  Content: typeof GroupContent
  Collapser: typeof GroupCollapser
}

interface GroupProps {
  initialCollapsed?: boolean
  collapsed?: boolean
  toggleCollapse?: () => void
}

export const Group: FC<GroupProps> & GroupSubComponents = ({ initialCollapsed = false, collapsed, toggleCollapse, children }) => {
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(initialCollapsed)

  if (collapsed !== undefined && !toggleCollapse) {
    throw new Error('The controlled version of this component should take in a toggleCollapse prop')
  } else {
    toggleCollapse = () => setUncontrolledCollapsed(!uncontrolledCollapsed)
  }

  const groupContext: GroupContextShape = {
    collapsed: collapsed !== undefined ? collapsed : uncontrolledCollapsed,
    toggleCollapse
  }

  return <GroupContext.Provider value={groupContext}>{children}</GroupContext.Provider>
}

Group.Header = GroupHeader
Group.Title = GroupTitle
Group.Separator = GroupSeparator
Group.Icon = GroupIcon
Group.Content = GroupContent
Group.Collapser = GroupCollapser

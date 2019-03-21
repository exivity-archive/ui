import React, { FC } from 'react'
import styled from 'styled-components'

import { Heading } from '../Heading'
import { fromTheme } from '../utils/styled'
import {
  CollapsibleContainer,
  CollapsibleContainerSubComponents,
  CollapsibleContainerProps
} from '../CollapsibleContainer'
import { Icon } from '../Icon'

const GroupIcon = styled(Icon)`
  margin-top: 10px;
  font-size: 30px;
`

const GroupCollapser: FC = () => (
  <Group.Icon><CollapsibleContainer.Collapser /></Group.Icon>
)

const StyledGroupHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`

const GroupHeader: FC = ({ children }) => (
  <StyledGroupHeader>{children}</StyledGroupHeader>
)

const GroupSeparator = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${fromTheme(theme => theme.colors.lightGray)};
  border: 0;
  margin: 20px 20px;
`

const GroupTitle = styled(Heading)`
  color: ${fromTheme(theme => theme.colors.gray)};
  margin: 0;
`

interface GroupSubComponents extends CollapsibleContainerSubComponents {
  Header: typeof GroupHeader
  Title: typeof GroupTitle
  Separator: typeof GroupSeparator
  Icon: typeof GroupIcon
}

interface GroupProps extends CollapsibleContainerProps {
  header?: string
}

export const Group: FC<GroupProps> & GroupSubComponents = ({ header, children, ...rest }) => {
  const Header = header ? (
    <Group.Header>
      <Group.Title>{header}</Group.Title>
      <Group.Separator />
      <Group.Collapser />
    </Group.Header>
  ) : null

  return <CollapsibleContainer {...rest}>{Header}{children}</CollapsibleContainer>
}

Group.Header = GroupHeader
Group.Title = GroupTitle
Group.Separator = GroupSeparator
Group.Icon = GroupIcon
Group.Content = CollapsibleContainer.Content
Group.Collapser = GroupCollapser

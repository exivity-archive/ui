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
  margin-top: 5px;
  font-size: 30px;
`

const GroupCollapser: FC = () => (
  <Group.Icon><CollapsibleContainer.Collapser /></Group.Icon>
)

const StyledGroupHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0 10px 0;
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

const StyledGroupTitle = styled.div`
  h1 {
    white-space: nowrap;
    color: ${fromTheme(theme => theme.colors.gray)};
  }
`

interface GroupTitleProps {
  section?: boolean
}

const GroupTitle: FC<GroupTitleProps> = ({ children, section }) => (
  <StyledGroupTitle>
    {typeof children === 'string' ? <Heading type={section ? 'section' : 'header'}>{children}</Heading> : children}
  </StyledGroupTitle>
)

interface GroupSubComponents extends CollapsibleContainerSubComponents {
  Header: typeof GroupHeader
  Title: typeof GroupTitle
  Separator: typeof GroupSeparator
  Icon: typeof GroupIcon
}

interface GroupProps extends CollapsibleContainerProps {
  header?: string
  section?: boolean
  content?: JSX.Element
}

export const Group: FC<GroupProps> & GroupSubComponents = ({ header, children, content, ...rest }) => {
  const Header = header ? (
    <Group.Header>
      <Group.Title>{header}</Group.Title>
      <Group.Separator />
      <Group.Collapser />
    </Group.Header>
  ) : null

  const Content = content ? (
    <Group.Content>
      {content}
    </Group.Content>
  ) : null

  return <CollapsibleContainer {...rest}>{Header}{Content}{children}</CollapsibleContainer>
}

Group.Header = GroupHeader
Group.Title = GroupTitle
Group.Separator = GroupSeparator
Group.Icon = GroupIcon
Group.Content = CollapsibleContainer.Content
Group.Collapser = GroupCollapser

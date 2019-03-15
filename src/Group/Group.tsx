import React, { FC, FunctionComponentElement, ReactNodeArray, ReactNode, useState } from 'react'
import PropTypes from 'prop-types'
import { Heading } from '../Heading'
import styled from 'styled-components'
import { Icon } from '../Icon'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { isPrimitive } from '../utils/isPrimitive'

const GroupSeparator = styled.hr`
  height: 2px;
  width: 100%;
  margin: 20px 20px;
`

const GroupIcon = styled(Icon)`
  margin-top: 8px;
`

interface GroupCollapserProps {
  collapsed: boolean
  toggleCollapse: () => void
}

const CollapserIcon = styled(GroupIcon)`
  cursor: pointer;
  user-select: none;
`

export const GroupCollapser: FC<GroupCollapserProps> = ({ collapsed, toggleCollapse }) => (
  <CollapserIcon onClick={toggleCollapse}>
    {collapsed ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
  </CollapserIcon>
)

const StyledGroupHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`

function isFunctionComponentElement (el: any): el is FunctionComponentElement<any> {
  if (!isPrimitive(el) && el.type && el.type.displayName) return true
  return false
}

function isEnrichPropsFunction (obj: any): obj is ((props: { toggleCollapse: () => void, collapsed?: boolean }) => React.ReactNode) {
  if (typeof obj === 'function') return true
  else return false
}

interface GroupHeaderProps {
  toggleCollapse: () => void
  children: React.ReactNode | ((props: { toggleCollapse: () => void }) => React.ReactNode)
}

export const GroupHeader: FC<GroupHeaderProps> = (props) => {
  let children: ReactNode | ReactNodeArray = React.Children.map(props.children, (child: FunctionComponentElement<any> | React.ReactNode) => {
    if (isFunctionComponentElement(child) && child.type.displayName === 'GroupCollapser') {
      return React.cloneElement(child, {
        ...child.props,
        ...props,
        toggleCollapse: props.toggleCollapse
      })
    } else {
      return child
    }
  })

  if (isEnrichPropsFunction(props.children)) {
    children = props.children({
      toggleCollapse: props.toggleCollapse
    })
  }

  return (
    <div className='ex-group__header'>
      {children}
    </div>
  )
}

interface GroupContentProps {
  collapsed: boolean
}

export const GroupContent: FC<GroupContentProps> = ({ collapsed, children }) => (
  collapsed ? null : <div>{children}</div>
)

interface GroupSubComponents {
  Header: typeof GroupHeader
  Title: typeof Heading
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

const Group: FC<GroupProps> & GroupSubComponents = ({ initialCollapsed = false, collapsed, toggleCollapse, children }) => {

  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(initialCollapsed)
  const uncontrolledToggleCollapse = () => setUncontrolledCollapsed(!uncontrolledCollapsed)

  toggleCollapse = collapsed !== undefined ? toggleCollapse : uncontrolledToggleCollapse
  if (!toggleCollapse) throw new Error('The controlled version of this component should take in a toggleCollapse prop')

  let newChildren = React.Children.map(children, (child: FunctionComponentElement<any> | React.ReactNode) => {
    if (isFunctionComponentElement(child)) {
      if (child.type.displayName === 'GroupHeader') {
        return React.cloneElement(child, {
          ...child.props,
          toggleCollapse,
          collapsed
        })
      } else if (child.type.displayName === 'GroupContent') {
        return React.cloneElement(child, {
          ...child.props,
          toggleCollapse,
          collapsed
        })
      } else {
        return child
      }
    }
  })

  if (isEnrichPropsFunction(children)) {
    children = children({
      toggleCollapse,
      collapsed
    })
  }

  return (
    <div className='ex-group'>
      {children}
    </div>
  )
}

Group.Header = GroupHeader
Group.Title = Heading
Group.Separator = GroupSeparator
Group.Icon = GroupIcon
Group.Content = GroupContent
Group.Collapser = GroupCollapser

export default Group

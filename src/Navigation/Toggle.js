import React from 'react'
import PropTypes from 'prop-types'
import { styled, Hidden, Link } from 'reakit'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'

import Icon from './../Icon'
import Item from './Item'

const ExpandIcon = () => <Icon><MdExpandMore /></Icon>
const CollapseIcon = () => <Icon><MdExpandLess /></Icon>

const StyledHiddenToggle = styled(Hidden.Toggle)`
  cursor: pointer;
`

const Toggle = ({ children, visible, ExpandIcon, CollapseIcon, ...otherProps }) => {
  return <StyledHiddenToggle
    as={[Link, 'button']}
    visible={visible}
    {...otherProps}>
    {/* workaround for bug https://codepen.io/rachelandrew/pen/dzXwRJ */}
    <Link as={[Item, 'div']} {...otherProps}>
      {children}
      {visible ? <CollapseIcon /> : <ExpandIcon />}
    </Link>
  </StyledHiddenToggle>
}

Toggle.propTypes = {
  ...Hidden.Toggle.propTypes,

  children: PropTypes.node,

  ExpandIcon: PropTypes.func,
  CollapseIcon: PropTypes.func
}

Toggle.defaultProps = {
  ExpandIcon,
  CollapseIcon
}

Toggle.displayName = 'Navigation.Toggle'

export default Toggle

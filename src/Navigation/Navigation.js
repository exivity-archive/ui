import React from 'react'
import PropTypes from 'prop-types'
import { Navigation as BaseNavigation, styled } from 'reakit'

import List from './../List'

import Item from './Item'
import Toggle from './Toggle'
import Hidden from './Hidden'

const NavigationWrapper = styled(BaseNavigation)``

const Navigation = ({ children, ...otherProps }) => {
  return <NavigationWrapper {...otherProps}>
    <List>
      {children}
    </List>
  </NavigationWrapper>
}

Navigation.Item = Item
Navigation.Toggle = Toggle
Navigation.Hidden = Hidden

Navigation.propTypes = {
  ...BaseNavigation.propTypes,
  children: PropTypes.node
}

Navigation.defaultProps = {}

Navigation.displayName = 'Navigation'

export default Navigation

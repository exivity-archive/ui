import React from 'react'
import PropTypes from 'prop-types'
import { Navigation as BaseNavigation, styled } from 'reakit'

import List from './../List'
import Item from './Item'

const NavigationWrapper = styled(BaseNavigation)``

const Navigation = ({ children, ...otherProps }) => {
  return <NavigationWrapper {...otherProps}>
    <List>
      {children}
    </List>
  </NavigationWrapper>
}

Navigation.propTypes = {
  ...BaseNavigation.propTypes,
  children: PropTypes.node
}

Navigation.Item = Item

Navigation.defaultProps = {}

Navigation.displayName = 'Navigation'

export default Navigation

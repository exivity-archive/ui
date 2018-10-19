import React from 'react'
import PropTypes from 'prop-types'
import { styled, Hidden, Link } from 'reakit'

import Item from './Item'

const StyledHiddenToggle = styled(Hidden.Toggle)`
  cursor: pointer;
`

const Toggle = ({ children, ...otherProps }) => {
  return <StyledHiddenToggle as={[Item, Link, 'button']} {...otherProps}>
    {/* workaround for bug https://codepen.io/rachelandrew/pen/dzXwRJ */}
    <Link as='div'>
      {children}
    </Link>
  </StyledHiddenToggle>
}

Toggle.propTypes = {
  ...Hidden.Toggle.propTypes,
  children: PropTypes.node
}

Toggle.defaultProps = {}

Toggle.displayName = 'Navigation.Toggle'

export default Toggle

import React from 'react'
import PropTypes from 'prop-types'
import { Button as BaseButton } from 'reakit'

import theme from '../theme'

const Button = (props) => {
  const colour = Object.keys(theme.palette)
    .find(key => props[key])
  return <BaseButton {...props} palette={colour} />
}

Button.propTypes = {
  children: PropTypes.node.isRequired,

  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool,

  small: PropTypes.bool,
  large: PropTypes.bool
}

export default Button

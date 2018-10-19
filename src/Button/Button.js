import PropTypes from 'prop-types'
import { styled, Box, Button as BaseButton } from 'reakit'
import { theme, ifProp } from 'styled-tools'

import { Icon } from '../Icon/Icon'
import withEnumProps from '../withEnumProps'

const Button = styled(BaseButton)`
  ${Icon} {
    margin-left: ${ifProp('rightIcon', theme('base.spaceHalf'), 0)};
    margin-right: ${ifProp('rightIcon', 0, theme('base.spaceHalf'))};
  }
`

Button.propTypes = {
  ...Box.propTypes,
  children: PropTypes.node,

  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool,

  scale: PropTypes.number,
  xsmall: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool,

  outlined: PropTypes.bool,
  rightIcon: PropTypes.bool,

  disabled: PropTypes.bool,

  onClick: PropTypes.func
}

Button.defaultProps = {
  opaque: true,
  palette: 'primary',
  scale: 1
}

export default withEnumProps(Button, {
  palette: 'key',
  scale: 'value'
})

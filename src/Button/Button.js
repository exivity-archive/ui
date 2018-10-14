import PropTypes from 'prop-types'
import { Button as BaseButton, styled } from 'reakit'
import { prop } from 'styled-tools'

import withEnumProps from '../withEnumProps'

const Button = styled(BaseButton)`
  font-size: ${prop('size')}em;
`

Button.propTypes = {
  ...BaseButton.propTypes,
  children: PropTypes.node.isRequired,

  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool,

  size: PropTypes.number,
  xsmall: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool
}

Button.defaultProps = {
  palette: 'primary',
  size: 1
}

export default withEnumProps(Button, {
  palette: 'key',
  size: 'value'
})

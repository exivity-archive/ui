import PropTypes from 'prop-types'
import { Box, Input as BaseInput, styled } from 'reakit'
import { theme } from 'styled-tools'
import withEnumProps from '../withEnumProps'

const Input = styled(BaseInput)`
  border-radius: ${theme('base.borderRadius')};
`

Input.propTypes = {
  ...Box.propTypes,

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

  disabled: PropTypes.bool,

  onChange: PropTypes.func
}

Input.defaultProps = {
  palette: 'grayscale',
  opaque: false,
  scale: 1
}

export default withEnumProps(Input, {
  palette: 'key',
  scale: 'value'
})

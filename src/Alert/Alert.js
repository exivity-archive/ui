import PropTypes from 'prop-types'
import { styled, Box } from 'reakit'
import { theme } from 'styled-tools'

const Alert = styled(Box)`
  padding: ${theme('base.spaceHalf')} ${theme('base.space')};
  border-radius: ${theme('base.borderRadius')};
`

Alert.propTypes = {
  ...Box.propTypes,
  children: PropTypes.node.isRequired
}

Alert.defaultProps = {
  opaque: true,
  palette: 'alert'
}

export default Alert

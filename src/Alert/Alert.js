import PropTypes from 'prop-types'
import { Box, styled } from 'reakit'
import { theme } from 'styled-tools'

import withEnumProps from '../withEnumProps'

const Alert = styled(Box)`
  padding: ${theme('base.spaceHalf')} ${theme('base.space')};
  border-radius: ${theme('base.borderRadius')};
`

Alert.propTypes = {
  ...Box.propTypes,
  palette: PropTypes.oneOf([
    'hoi', 'hai'
  ]),
  children: PropTypes.node,

  primary: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool
}

Alert.defaultProps = {
  opaque: true,
  palette: 'primary'
}

export default withEnumProps(Alert, { palette: 'key' })

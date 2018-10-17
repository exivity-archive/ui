import PropTypes from 'prop-types'
import { Box, styled } from 'reakit'
import { theme } from 'styled-tools'

import withEnumProps from '../withEnumProps'

const Field = styled(Box)`
  border-radius: ${theme('base.borderRadius')};
`

Field.propTypes = {
  ...Box.propTypes,
  children: PropTypes.node,

  success: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool
}

Field.defaultProps = {
  opaque: true,
  palette: 'success'
}

export default withEnumProps(Field, { palette: 'key' })

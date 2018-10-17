import PropTypes from 'prop-types'
import { Box, styled } from 'reakit'
import { theme } from 'styled-tools'

import withEnumProps from '../withEnumProps'

const DataGrid = styled(Box)`
  border-radius: ${theme('base.borderRadius')};
`

DataGrid.propTypes = {
  ...Box.propTypes,
  children: PropTypes.node,

  success: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool
}

DataGrid.defaultProps = {
  opaque: true,
  palette: 'success'
}

export default withEnumProps(DataGrid, { palette: 'key' })

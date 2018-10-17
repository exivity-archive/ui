import PropTypes from 'prop-types'
import { Box, styled } from 'reakit'
import { theme } from 'styled-tools'

import withEnumProps from '../withEnumProps'

const {Component} = styled(Box)`
  border-radius: ${theme('base.borderRadius')};
`

{Component}.propTypes = {
  ...Box.propTypes,
  children: PropTypes.node,

  success: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool
}

{Component}.defaultProps = {
  opaque: true,
  palette: 'success'
}

{Component}.displayName = '{Component}'

export default withEnumProps({Component}, { palette: 'key' })

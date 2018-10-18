import PropTypes from 'prop-types'
import { styled, Inline } from 'reakit'
import { theme } from 'styled-tools'

import withEnumProps from '../withEnumProps'

export const Icon = styled(Inline)`  
  ${theme('Icon')};
`

Icon.propTypes = {
  ...Inline.propTypes,
  children: PropTypes.node,

  sup: PropTypes.node,
  sub: PropTypes.node,

  scale: PropTypes.number,
  xsmall: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool
}

Icon.defaultProps = {
  scale: 1
}

Icon.displayName = 'Icon'

export default withEnumProps(Icon, { scale: 'value' })

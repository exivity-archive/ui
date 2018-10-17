import PropTypes from 'prop-types'
import { Table } from 'reakit'

import withEnumProps from '../withEnumProps'

Table.propTypes = {
  ...Table.propTypes,
  children: PropTypes.node,

  scale: PropTypes.number,
  xsmall: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool,

  compact: PropTypes.bool
}

Table.defaultProps = {
  scale: 1
}

Table.displayName = 'Table'

export default withEnumProps(Table, { scale: 'value' })

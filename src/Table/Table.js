import PropTypes from 'prop-types'
import { Table } from 'reakit'

import withEnumProps from '../withEnumProps'

Table.propTypes = {
  ...Table.propTypes,
  children: PropTypes.node.isRequired,

  size: PropTypes.number,
  xsmall: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool,

  compact: PropTypes.bool
}

Table.defaultProps = {
  size: 1
}

Table.displayName = 'Table'

export default withEnumProps(Table, { size: 'value' })

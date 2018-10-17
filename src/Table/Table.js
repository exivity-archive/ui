import PropTypes from 'prop-types'
import { styled, Table as BaseTable } from 'reakit'

import withEnumProps from '../withEnumProps'

const Table = styled(BaseTable)``

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

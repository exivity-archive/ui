import PropTypes from 'prop-types'
import { List } from 'reakit'

List.propTypes = {
  ...List.propTypes,
  children: PropTypes.node,

  ordered: PropTypes.bool,
  unordered: PropTypes.bool
}

List.defaultProps = {}

List.displayName = 'List'

export default List

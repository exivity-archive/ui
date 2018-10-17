import PropTypes from 'prop-types'
import { styled, List as BaseList } from 'reakit'

const List = styled(BaseList)``

List.propTypes = {
  ...List.propTypes,
  children: PropTypes.node,

  ordered: PropTypes.bool,
  unordered: PropTypes.bool
}

List.defaultProps = {}

export default List

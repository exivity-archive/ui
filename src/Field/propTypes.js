import PropTypes from 'prop-types'
import { Field } from 'reakit'

export default {
  ...Field.propTypes,
  children: PropTypes.node,

  horizontal: PropTypes.bool,
  align: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  nowrap: PropTypes.bool
}

export const defaultProps = {}

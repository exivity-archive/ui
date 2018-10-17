import PropTypes from 'prop-types'
import { Label } from 'reakit'

Label.propTypes = {
  ...Label.propTypes,
  children: PropTypes.node
}

Label.defaultProps = {}

Label.displayName = 'Label'

export default Label

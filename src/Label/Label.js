import PropTypes from 'prop-types'
import { styled, Label as BaseLabel } from 'reakit'

const Label = styled(BaseLabel)``

Label.propTypes = {
  ...Label.propTypes,
  children: PropTypes.node
}

Label.defaultProps = {}

export default Label

import PropTypes from 'prop-types'
import { styled } from 'styled-components'

const Button = styled('button')`
  padding: 4px;
`

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
}

Button.defaultProps = {}

export default Button

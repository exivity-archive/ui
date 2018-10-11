import PropTypes from 'prop-types'
import styled from 'styled-components'
import defaultTheme from '../theme/defaultTheme'

const Code = styled.code`
  font-family: ${props => props.theme.fonts.code.family};
  font-weight: ${props => props.theme.fonts.code.weight};
  
  background-color: ${props => props.theme.colours.mark};
  padding: 3px;
  border-radius: ${props => props.theme.border.radius};
`

Code.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object
}

Code.defaultProps = {
  theme: defaultTheme
}

export default Code

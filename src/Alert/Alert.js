import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { themed } from '../theme'

const styles = props => css`
  background-color: ${props.theme.colours.warning};
  padding: ${props.theme.spacing * props.theme.size}px;
  border-radius: ${props.theme.border.radius};

  ${props.danger && `
    color: ${props.theme.colours.bg};
    background-color: ${props.theme.colours.danger};
  `}
`

const Alert = styled.div`${styles}`

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  danger: PropTypes.bool
}

export default themed(Alert)

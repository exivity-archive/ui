import PropTypes from 'prop-types'
import color from 'color'
import styled, { css } from 'styled-components'
import * as constants from '../theme/constants'
import defaultTheme from '../theme/defaultTheme'

const buttonSize = ({ theme, small, large }) => {
  let multiplier = 1

  if (small === true) multiplier = constants.SIZE_SMALL / constants.SIZE_DEFAULT
  if (large === true) multiplier = constants.SIZE_LARGE / constants.SIZE_DEFAULT

  return theme.size * multiplier
}

const darkenBy = 0.2

const Button = styled.button`
  font-size: ${buttonSize}px;
  font-family: ${props => props.theme.fonts.interaction.family};
  font-weight: ${props => props.theme.fonts.interaction.weight};
  
  text-transform: uppercase;
  
  border: 2px solid ${props => props.theme.colours.grayLightest};
  background: transparent;
  color: ${props => props.theme.colours.dark};
  
  transition: border-color 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
  
  margin: 0;
  padding:
    ${props => props.theme.spacing / 2}rem
    ${props => props.theme.spacing * 2}rem;
  border-radius: ${props => props.theme.border.radius};

  &:not(:first-child) {
     margin-left: ${props => props.theme.spacing}rem;
  }
  
  &:not(:last-child) {
     margin-right: ${props => props.theme.spacing}rem;
  }
  
  &:hover {
    cursor: pointer;
    border: 2px solid ${props => props.theme.colours.dark};
  }
  
  ${props => props.primary && css`
    border: 2px solid ${props.theme.colours.primary};
    background: ${props.theme.colours.primary};
    color: ${props.theme.colours.lightest};
    
    &:hover {
      border-color: ${color(props.theme.colours.primary).darken(darkenBy).string()};
      background: ${color(props.theme.colours.primary).darken(darkenBy).string()};
    }
  `}
  
  ${props => props.success && css`
    border: 2px solid ${props.theme.colours.success};
    background: ${props.theme.colours.success};
    color: ${props.theme.colours.lightest};
    
    &:hover {
      border-color: ${color(props.theme.colours.success).darken(darkenBy).string()};
      background: ${color(props.theme.colours.success).darken(darkenBy).string()};
    }
  `}
  
  ${props => props.warning && css`
    border: 2px solid ${props.theme.colours.warning};
    background: ${props.theme.colours.warning};
    
    &:hover {
      border-color: ${color(props.theme.colours.warning).darken(darkenBy).string()};
      background: ${color(props.theme.colours.warning).darken(darkenBy).string()};
    }
  `}
  
  ${props => props.danger && css`
    border: 2px solid ${props.theme.colours.danger};
    background: ${props.theme.colours.danger};
    color: ${props => props.theme.colours.lightest};
    
    &:hover {
      border-color: ${color(props.theme.colours.danger).darken(darkenBy).string()};
      background: ${color(props.theme.colours.danger).darken(darkenBy).string()};
    }
  `}
`

Button.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object,

  primary: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool,

  small: PropTypes.bool,
  large: PropTypes.bool
}

Button.defaultProps = {
  theme: defaultTheme
}

export default Button

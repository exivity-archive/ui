import PropTypes from 'prop-types'
import styled from 'styled-components'
import color from 'color'
import { preciseRm, themed } from '../theme'

const fontSize = ({ theme, mini, small }) => {
  let multiplier = 1

  if (mini === true) multiplier = preciseRm(0.7)
  if (small === true) multiplier = preciseRm(0.85)

  return theme.size * multiplier
}

const padding = ({ theme, mini, small }) => {
  let multiplier = 1

  if (mini === true) multiplier = preciseRm(0.7)
  if (small === true) multiplier = preciseRm(0.85)

  return multiplier * theme.spacing / 2
}

const Table = styled.table`
  font-size: ${fontSize}px;
  
  border-collapse: none;
  
  th {
    font-weight: ${props => props.theme.fonts.base.bold};
  }
  
  th, td {
    padding: ${padding}em 0;
    
    &:not(:first-child) {
      padding-left: ${padding}em;
    }
    
    &:not(:last-child) {
      padding-right: ${padding}em;
    }
  }
  
  thead th {
    text-align: left;
    border-bottom: 1px solid ${props => color(props.theme.colours.bg).darken(0.05).string()};
  }
  
  tr:not(:last-child) {
    td {
      border-bottom: 1px solid ${props => color(props.theme.colours.bg).darken(0.05).string()};
    }
  }
`

Table.propTypes = {
  children: PropTypes.node.isRequired,

  mini: PropTypes.bool,
  small: PropTypes.bool
}

export default themed(Table)

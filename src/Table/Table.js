import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const tableSize = ({ theme, mini, small }) => {
  let multiplier = 1

  if (mini === true) multiplier = 0.6
  if (small === true) multiplier = 0.8

  return theme.size * multiplier
}

const StyledTable = styled.table`
  font-size: ${tableSize}px;
  
  border-collapse: none;
  
  th {
    font-weight: ${props => props.theme.fonts.base.bold};
  }
  
  th, td {
    padding: ${props => props.theme.spacing / 2}rem 0;
    
    &:not(:first-child) {
      padding-left: ${props => props.theme.spacing / 2}rem  ;
    }
    
    &:not(:last-child) {
      padding-right: ${props => props.theme.spacing / 2}rem;
    }
  }
  
  thead th {
    text-align: left;
    border-bottom: 1px solid ${props => props.theme.colours.light};
  }
  
  tr:not(:last-child) {
    td {
      border-bottom: 1px solid ${props => props.theme.colours.light};
    }
  }
`

const Table = ({ children, ...props }) => (
  <StyledTable {...props}>
    {children}
  </StyledTable>
)

Table.propTypes = {
  children: PropTypes.node.isRequired,
  mini: PropTypes.bool,
  small: PropTypes.bool
}

Table.defaultProps = {
}

export default Table

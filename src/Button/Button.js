import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;

  ${props =>
    props.primary && css`
      background: ${props.theme.colours.primary};
    `}
`

const StyledButton = ({ children, primary }) => <Button primary={primary}>
  {children}
</Button>

StyledButton.propTypes = {
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool
}

export default StyledButton

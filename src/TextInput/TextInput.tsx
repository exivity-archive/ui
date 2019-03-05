import * as React from 'react'
import styled, { css } from 'styled-components'
import defaultStyledProps from '../utils/testing/defaultStyledProps'
import { fromTheme, globalFont, hexToString, matchThemeProp } from '../utils/theme'

interface ITextInputProps {
  value: string
  onChange: (value: string) => void

  outlined?: boolean

  // Purposes
  primary?: boolean
  secondary?: boolean
  success?: boolean
  danger?: boolean

  // Sizes
  small?: boolean
  large?: boolean
}

export const TextInput: React.FC<ITextInputProps> = ({ value, onChange, ...rest }) => (
  <StyledInput
    type='text'
    value={value}
    onChange={(event: any) => onChange(event.target.value)}
    {...rest}
  />
)

export const StyledInput = styled.input <ITextInputProps>`
  ${globalFont};
  font-size: ${matchThemeProp(theme => theme.global.sizes, {
    modifier: (em: number) => em * 16,
    defaultValue: 16
  })}px;

  display: block;
  width: 100%;
  padding: 0 0.5em;
  height: 2.5em;
  background-color: ${fromTheme(theme => theme.colours.lightGray)};
  border-radius: ${fromTheme(theme => theme.global.borderRadius)};
  outline: 0;
  border: 0;

  ${props => props.outlined && css`
    border: ${fromTheme(theme => theme.global.borderWidth)} solid ${matchThemeProp(theme => theme.global.purposes)};
  `}

  --focus-color: ${matchThemeProp(theme => theme.global.purposes, { modifier: hexToString })};

  &:focus {
    box-shadow: 0 0 0 ${fromTheme(theme => theme.global.outlineWidth)} rgba(var(--focus-color), 0.3);
  }

  &[type="checkbox"],
  &[type="radio"] {
    display: inline-block;
    width: auto;
    height: auto;
    padding: 0;
  }

  &::placeholder {
    color: currentcolor;
    opacity: 0.5;
  }

  textarea & {
    padding: 0.5em;
    height: auto;
  }

  &[disabled] {
    cursor: not-allowed;
    box-shadow: inset 0 0 999em rgba(128, 128, 128, 0.2);
  }
`

TextInput.defaultProps = {
  ...defaultStyledProps,
  value: '',
  secondary: true
}

export default TextInput

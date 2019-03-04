import React, { ChangeEvent, InputHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import defaultStyledProps from '../utils/testing/defaultStyledProps'
import { fromTheme, globalFont, hexToString, matchThemeProp, StyledProps } from '../utils/theme'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement>, StyledProps {
  value: string
  onChange: ((value: string) => void) & ((event: ChangeEvent<HTMLInputElement>) => void)

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

export const TextInput: React.FC<TextInputProps> = ({ value, onChange, theme, ...rest }) => (
  <input
    type='text'
    value={value}
    onChange={(event) => onChange(event.target.value)}
    {...rest}
  />
)

const StyledTextInput = styled(TextInput)`
  ${globalFont};
  font-size: ${matchThemeProp(theme => theme.global.sizes, {
    modifier: (em: number) => em * 16,
    defaultValue: 16
  })}px;

  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 0 0.5em;
  height: 2.5em;
  border-radius: ${fromTheme(theme => theme.global.borderRadius)}px;
  outline: 0;
  border: 0;

  ${props => props.outlined
    ? css`
      border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${matchThemeProp(theme => theme.global.purposes)};
      background-color: unset;

      &:hover {
        border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.colours.gray)};
      }

      &:focus {
        border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.colours.dark)};
      }
    `
    : css `
      border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.colours.lightGray)};
      background-color: ${fromTheme(theme => theme.colours.lightGray)};

      &:hover {
        border-bottom: ${fromTheme(theme => theme.global.borderWidth)}px solid rgba(var(--focus-color), 0.5);
      }

      &:focus {
        border-bottom: ${fromTheme(theme => theme.global.borderWidth)}px solid rgba(var(--focus-color), 1);
      }
    `}

  --focus-color: ${matchThemeProp(theme => theme.global.purposes, { modifier: hexToString })};

  &::placeholder {
    color: currentcolor;
    opacity: 0.5;
  }

  &[disabled] {
    cursor: not-allowed;
    box-shadow: inset 0 0 999em rgba(128, 128, 128, 0.2);
  }
`

StyledTextInput.defaultProps = {
  ...defaultStyledProps,
  value: '',
  secondary: true
}

export default StyledTextInput

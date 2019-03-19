import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react'
import styled, { css } from 'styled-components'
import {
  fromTheme,
  globalFont,
  hexToString,
  matchThemeProp,
  StyledProps
} from '../utils/styled'
import { Omit } from '../utils/types'

export type OmitOnChangeHTMLInputAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

export type OnChange<T = string, E = HTMLInputElement> = (value: T, event: ChangeEvent<E>) => void

export interface StyledInputProps extends StyledProps {
  // Purposes
  primary?: boolean
  secondary?: boolean
  success?: boolean
  danger?: boolean

  // Sizes
  tiny?: boolean
  small?: boolean
  large?: boolean

  // Variants
  outlined?: boolean
  inlined?: boolean
}

export interface InputProps extends StyledInputProps, OmitOnChangeHTMLInputAttributes {
  value?: string | number
  onChange?: OnChange
  required?: boolean
}

interface Props extends InputProps {
  step?: number | string
  type?: string
}

export const inputStyles = css<StyledInputProps>`
  ${globalFont};

  font-size: ${matchThemeProp(theme => theme.global.sizes)}rem;

  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: calc(0.5em - ${fromTheme(theme => theme.global.borderWidth)}px) 0.5em; // subtract border to get a height of exactly 2.5em for single line items

  border-radius: ${fromTheme(theme => theme.global.borderRadius)}px;
  outline: 0;
  border: 0;

  --focus-color: ${matchThemeProp(theme => theme.global.purposes, { modifier: hexToString })};

  ${props => (!props.outlined && !props.inlined) && css`
    border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.colours.lightGray)};
    background-color: ${fromTheme(theme => theme.colours.lightGray)};

    &:hover {
      border-bottom: ${fromTheme(theme => theme.global.borderWidth)}px solid rgba(var(--focus-color), 0.5);
    }

    &:focus {
      border-bottom: ${fromTheme(theme => theme.global.borderWidth)}px solid rgba(var(--focus-color), 1);
    }
  `}

  ${props => props.outlined && css`
    border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${matchThemeProp(theme => theme.global.purposes)};
    background-color: unset;

    &:hover {
      border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.colours.gray)};
    }

    &:focus {
      border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.colours.dark)};
    }
  `}

  ${props => props.inlined && css`
    padding: 0;
    outline-offset: 9px;

    &:hover {
      outline: ${fromTheme(theme => theme.global.borderWidth)}px solid rgba(var(--focus-color), 0.5);
    }

    &:focus {
      outline: ${fromTheme(theme => theme.global.borderWidth)}px solid rgba(var(--focus-color), 1);
    }
  `}

  &::placeholder {
    color: currentcolor;
    opacity: 0.5;
  }

  &[disabled] {
    cursor: not-allowed;
    box-shadow: inset 0 0 999em rgba(128, 128, 128, 0.2);
  }
`

const StyledInput = styled.input`
  ${inputStyles};
`

export const AbstractInput =
  ({ type, onChange, ...rest }: Props) => {
    const [valid, setValid] = useState(true)
    return <StyledInput
      type={type || 'text'}
      danger={!valid}
      onChange={(event) => {
        onChange && onChange(event.target.value, event)
        event.target.checkValidity && setValid(event.target.checkValidity())
      }}
      {...rest}
    />
  }

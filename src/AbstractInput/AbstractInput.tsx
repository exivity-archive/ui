import React, { ChangeEvent, InputHTMLAttributes, useState, forwardRef, Ref } from 'react'
import styled, { css } from 'styled-components'
import { animated } from 'react-spring'

import {
  fromTheme,
  globalFont,
  toRgbString,
  matchThemeProp, PurposesProps, SizesProps,
  StyledProps
} from '../utils/styled'
import { Omit } from '../utils/types'

export type OmitOnChangeHTMLInputAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

export type OnChange<T = string, E = HTMLInputElement> = (value: T, event: ChangeEvent<E>) => void

export interface StyledInputProps extends PurposesProps, SizesProps, StyledProps {
  // Variants
  outlined?: boolean
  flat?: boolean

  // Layout
  inline?: boolean
}

export interface InputProps extends StyledInputProps, OmitOnChangeHTMLInputAttributes {
  value?: string | number
  onChange?: OnChange
  required?: boolean
  ref?: React.RefObject<HTMLInputElement> | null
}

interface Props extends InputProps {
  step?: number | string
  type?: string
}

export const inputStyles = css<StyledInputProps>`
  ${globalFont};

  font-size: ${matchThemeProp(theme => theme.global.sizes)}rem;

  box-sizing: border-box;
  padding: calc(0.5em - ${fromTheme(theme => theme.global.borderWidth)}px) 0.5em; // subtract border to get a height of exactly 2.5em for single line items

  border-radius: ${fromTheme(theme => theme.global.borderRadius)}px;
  outline: 0;
  border: 0;

  --focus-color: ${matchThemeProp(theme => theme.global.purposes, { modifier: toRgbString })};

  ${props => (!props.inline) && css`
    display: block;
    width: 100%;
  `}

  ${props => (!props.outlined && !props.flat) && css`
    border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.colors.lightGray)};
    background-color: ${fromTheme(theme => theme.colors.lightGray)};

    &:hover {
      border-bottom: ${fromTheme(theme => theme.global.borderWidth)}px solid rgba(var(--focus-color), 0.5);
    }

    &:focus {
      border-bottom: ${fromTheme(theme => theme.global.borderWidth)}px solid rgba(var(--focus-color), 1);
    }
  `}

  ${props => (props.outlined && !props.flat) && css`
    border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${matchThemeProp(theme => theme.global.purposes)};
    background-color: unset;

    &:hover {
      border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.colors.gray)};
    }

    &:focus {
      border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.colors.dark)};
    }
  `}

  ${props => props.flat && css<StyledInputProps>`
    padding: 0;

    ${props => props.outlined && css`
      outline-offset: 9px;

      &:hover {
        outline: ${fromTheme(theme => theme.global.borderWidth)}px solid rgba(var(--focus-color), 0.5);
      }

      &:focus {
        outline: ${fromTheme(theme => theme.global.borderWidth)}px solid rgba(var(--focus-color), 1);
      }
    `}
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

const AnimatedStyledInput = animated(StyledInput)

export const AbstractInput =
  forwardRef(({ type, onChange, ...rest }: Props, ref: Ref<HTMLInputElement>) => {
    const [valid, setValid] = useState(true)
    return <AnimatedStyledInput
      type={type || 'text'}
      ref={ref}
      danger={!valid}
      onChange={(event) => {
        onChange && onChange(event.target.value, event)
        event.target.checkValidity && setValid(event.target.checkValidity())
      }}
      {...rest}
    />
  })

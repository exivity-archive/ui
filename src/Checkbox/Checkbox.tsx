import React, { ReactElement, ReactNode, useMemo } from 'react'

import styled, { css } from 'styled-components'
import { OmitOnChangeHTMLInputAttributes, OnChange } from '../AbstractInput/AbstractInput'
import { Label } from '../Label'
import { randomId } from '../utils/randomId'
import { fromTheme, StyledProps } from '../utils/styled'

export interface CheckboxProps extends StyledProps, OmitOnChangeHTMLInputAttributes {
  radio?: boolean
  checked?: boolean
  onChange?: OnChange<boolean>
  label?: string | ReactNode
}

const animationSpeed = '0.25s'

export const StyledCheckbox = styled.input`
  // Take it out of document flow and hide it
  position: absolute;
  opacity: 0;
  z-index: -1;

  & + label {
    position: relative;
    display: inline-block;
    padding: 0 0 0 2em;
    cursor: pointer;
    line-height: 1em;
    height: 1em;

    color: ${fromTheme(theme => theme.global.textColorMuted)};

    will-change: color;
    transition: ${animationSpeed} color ease;

    &:focus {
      outline: 0;
    }

    &:empty {
      padding: 0 0 0 1em;
    }

    &::before,
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 1em;
      height: 1em;
      will-change: transform, background-color, color;
      transition: ${animationSpeed} all ease;
    }

    &::before {
      content: " ";
      border-radius: ${props => props.type === 'checkbox'
        ? css`${fromTheme(theme => theme.global.borderRadius)}px`
        : '50%'};
      background-color: ${fromTheme(theme => theme.colours.lightGray)};
    }

    &::after {
      transform: scale(0);
    }

    ${props => props.type === 'checkbox' && css`
      &::after {
        content: "\\2714";
        color: ${fromTheme(theme => theme.colours.white)};
        line-height: 1.1em;
        text-align: center;
      }
    `}

    ${props => props.type === 'radio' && css`
      &::after {
        content: " ";
        top: .25em;
        left: .25em;
        width: 0.5em;
        height: 0.5em;
        background: ${fromTheme(theme => theme.colours.dark)};
        border: .2em solid ${fromTheme(theme => theme.colours.lightGray)};
        border-radius: 50%;
      }
    `}
  }

  &:focus + label::before,
  & + label:hover::before {
    background-color: ${fromTheme(theme => theme.colours.gray)};
  }

  &:checked + label {
    color: ${fromTheme(theme => theme.global.textColor)};

    &::before {
      background-color: ${fromTheme(theme => theme.colours.dark)};
    }

    &::after {
      transform: scale(0.9);
    }
  }
`

export const Checkbox = ({ radio, checked, onChange, label = '', id, ...props }: CheckboxProps) => {
  const memoizedId = useMemo(() => id || randomId(), [])

  return <span>
    <StyledCheckbox
      type={radio ? 'radio' : 'checkbox'}
      onChange={event => {
        onChange && onChange(event.target.checked, event)
      }}
      checked={checked}
      id={memoizedId}
      {...props}
    />
    {typeof label === 'string'
      ? <Label htmlFor={memoizedId}>{label}</Label>
      : React.cloneElement(label as ReactElement, {
        as: 'label',
        htmlFor: memoizedId
      })}
  </span>
}

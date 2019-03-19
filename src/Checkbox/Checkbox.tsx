import React, { ReactElement, ReactNode, useMemo } from 'react'

import styled, { css } from 'styled-components'
import { OmitOnChangeHTMLInputAttributes, OnChange } from '../AbstractInput/AbstractInput'
import { Label } from '../Label'
import { fromTheme, StyledProps } from '../utils/styled'
import { randomId } from '../utils/randomId'

export interface CheckboxProps extends StyledProps, OmitOnChangeHTMLInputAttributes {
  checked?: boolean
  onChange?: OnChange<boolean>
  label?: string | ReactNode
}

export const StyledCheckbox = styled.input.attrs({
  type: 'checkbox' as string
})`
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
      transition: .25s all ease;
    }

    &::before {
      content: " ";
      border-radius: ${fromTheme(theme => theme.global.borderRadius)}px;
      background-color: ${fromTheme(theme => theme.colours.lightGray)};
    }

    &::after {
      content: "\\2714";
      color: #2c3e50;
      line-height: 1.1em;
      text-align: center;
      transform: scale(0);
    }
  }

  &:checked {
    & + label::after {
      transform: scale(0.9);
    }
  }
`

export const Checkbox = ({ checked, onChange, label = '', id, ...props }: CheckboxProps) => {
  const memoizedId = useMemo(() => id || randomId(), [])

  return <>
    <StyledCheckbox
      onChange={event => {
        onChange && onChange(event.target.checked, event)
      }}
      checked={checked}
      id={memoizedId}
      {...props}
    />
    {typeof label === 'string'
      ? <Label htmlFor={memoizedId}>{label}</Label>
      : React.cloneElement(label as ReactElement, { as: 'label', htmlFor: memoizedId })}
  </>
}

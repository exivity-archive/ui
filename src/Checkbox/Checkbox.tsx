import React, { ReactNode } from 'react'

import styled, { css } from 'styled-components'
import { OmitOnChangeHTMLInputAttributes, OnChange } from '../AbstractInput/AbstractInput'
import { Label } from '../Label'
import { StyledProps } from '../utils/styled'

export interface CheckboxProps extends StyledProps, OmitOnChangeHTMLInputAttributes {
  checked?: boolean
  onChange?: OnChange<boolean>
  label?: string | ReactNode
}

export const StyledCheckbox = styled.input.attrs({
  type: 'checkbox' as string
})`
  // Take it out of document flow
  position: absolute;

  // Hide it
  opacity: 0;

  & + ${Label} {
    position: relative;
    cursor: pointer;
    padding: 0;
  }

  & + label:before {
    content: '';
    margin-right: 10px;
    display: inline-block;
    vertical-align: text-top;
    width: 20px;
    height: 20px;
    background: white;
  }

  // Box hover
  &:hover + label:before {
    background: #f35429;
  }

  // Box focus
  &:focus + label:before {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
  }

  // Box checked
  &:checked + label:before {
    background: #f35429;
  }

  // Disabled state label.
  &:disabled + label {
    color: #b8b8b8;
    cursor: auto;
  }

  // Disabled box.
  &:disabled + label:before {
    box-shadow: none;
    background: #ddd;
  }

  // Checkmark. Could be replaced with an image
  &:checked + label:after {
    content: '';
    position: absolute;
    left: 5px;
    top: 9px;
    background: white;
    width: 2px;
    height: 2px;
    box-shadow:
      2px 0 0 white,
      4px 0 0 white,
      4px -2px 0 white,
      4px -4px 0 white,
      4px -6px 0 white,
      4px -8px 0 white;
    transform: rotate(45deg);
  }
`

export const Checkbox = ({ checked, onChange, label, ...props }: CheckboxProps) => (
  <>
    <StyledCheckbox
      onChange={event => {
        onChange && onChange(event.target.checked, event)
      }}
      checked={checked}
      {...props}
    />
    {typeof label === 'string'
      ? <Label>{label}</Label>
      : label}
  </>
)

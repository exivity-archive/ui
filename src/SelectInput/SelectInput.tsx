import React from 'react'
import styled, { css } from 'styled-components'

import { Omit } from '../utils/types'
import { OmitOnChangeHTMLInputAttributes, InputProps, Input } from '../Input/Input'

export type SelectInputProps = Omit<InputProps, 'prefix'>

export const SelectInput: React.FC<SelectInputProps & OmitOnChangeHTMLInputAttributes> = ({
  disabled,
  onChange,
  ...rest
}) => (
    <StyledSelectInput onChange={onChange} {...rest} disabled isDisabled={disabled} />
  )

const StyledSelectInput = styled(Input) <{ isDisabled?: boolean }>`
  ${props => props.isDisabled
    ? css`
       &[disabled] {
          cursor: not-allowed;
        }
      `
    : css`
      &[disabled] {
        cursor: pointer;
        box-shadow: none;
      }
    `
  }
`

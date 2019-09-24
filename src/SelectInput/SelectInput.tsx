import React, { forwardRef, Ref } from 'react'
import styled, { css } from 'styled-components'
import { MdKeyboardArrowDown } from 'react-icons/md'

import { OmitOnChangeHTMLInputAttributes, InputProps, Input } from '../Input/Input'
import { Adornment, Icon } from '../'

export const SelectInput = forwardRef(({
  disabled,
  onChange,
  ...rest
}: InputProps & OmitOnChangeHTMLInputAttributes, ref: Ref<HTMLInputElement>) => (
  <Adornment right={<Icon><MdKeyboardArrowDown /></Icon>}>
    <StyledSelectInput ref={ref} onChange={onChange} {...rest} disabled isDisabled={disabled} />
  </Adornment>
))

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

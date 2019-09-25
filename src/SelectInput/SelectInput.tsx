import React, { forwardRef, Ref } from 'react'
import styled, { css } from 'styled-components'
import { MdKeyboardArrowDown } from 'react-icons/md'

import { OmitOnChangeHTMLInputAttributes, InputProps, Input } from '../Input/Input'
import { Adornment, Icon } from '../'

export type SelectInputProps = InputProps & OmitOnChangeHTMLInputAttributes

export const SelectInput = forwardRef((
  props: SelectInputProps,
  ref: Ref<HTMLInputElement>
) => (
  <Adornment right={<Icon><MdKeyboardArrowDown /></Icon>}>
    <StyledSelectInput ref={ref} {...props} />
  </Adornment>
))

const StyledSelectInput = styled(Input)`
  ${props => props.disabled
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

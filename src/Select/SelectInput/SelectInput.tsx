import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { MdKeyboardArrowDown } from 'react-icons/md'

import { OmitOnChangeHTMLInputAttributes, InputProps, Input, Adornment, Icon } from '../..'

export type SelectInputProps = InputProps & OmitOnChangeHTMLInputAttributes

const StyledSelectInput = styled(Input).attrs<SelectInputProps>({
  readOnly: true
})`
  cursor: pointer;
  box-shadow: none;

  &[disabled] {
    cursor: not-allowed;
  }
`

export const SelectInput = forwardRef<HTMLInputElement, SelectInputProps>((props, ref) => (
  <Adornment right={<Icon><MdKeyboardArrowDown /></Icon>}>
    <StyledSelectInput ref={ref} {...props} />
  </Adornment>
))

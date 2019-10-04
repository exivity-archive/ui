import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { MdKeyboardArrowDown } from 'react-icons/md'

import { OmitOnChangeHTMLInputAttributes, InputProps, Input } from '../Input/Input'
import { Adornment, Icon } from '../'

export type SelectInputProps = InputProps & OmitOnChangeHTMLInputAttributes

export const SelectInput = forwardRef <any, SelectInputProps>((props, ref) => (
  <Adornment right={<Icon><MdKeyboardArrowDown /></Icon>}>
    <StyledSelectInput ref={ref} {...props} />
  </Adornment>
))

const StyledSelectInput = styled(Input)`
  cursor: pointer;
  box-shadow: none;

  &[disabled] {
    cursor: not-allowed;
  }
`

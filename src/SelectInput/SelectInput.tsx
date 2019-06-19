import React from 'react'
import styled, { css } from 'styled-components'
import { MdKeyboardArrowDown } from 'react-icons/md'

import { OmitOnChangeHTMLInputAttributes, InputProps, Input } from '../Input/Input'
import { Adornment, Icon } from '../'

export const SelectInput: React.FC<InputProps & OmitOnChangeHTMLInputAttributes> = ({
  disabled,
  onChange,
  ...rest
}) => (
    <Adornment rightComponent={<Icon><MdKeyboardArrowDown /></Icon>}>
      <StyledSelectInput onChange={onChange} {...rest} disabled isDisabled={disabled} />
    </Adornment>
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

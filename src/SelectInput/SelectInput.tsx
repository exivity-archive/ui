import React from 'react'
import styled, { css } from 'styled-components'
import { MdKeyboardArrowDown } from 'react-icons/md'

import { Omit } from '../utils/types'
import { OmitOnChangeAndPrefixHTMLInputAttributes, InputProps, Input } from '../Input/Input'
import { Icon } from '../Icon'

export type SelectInputProps = Omit<InputProps, 'prefix'>

export const SelectInput: React.FC<SelectInputProps & OmitOnChangeAndPrefixHTMLInputAttributes> = ({
  disabled,
  onChange,
  ...rest
}) => (
    <StyledSelectInput prefix={<Icon offSet={10}><MdKeyboardArrowDown /></Icon>} onChange={onChange} {...rest} disabled isDisabled={disabled} />
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

import React from 'react'
import styled, { css } from 'styled-components'
import { MdKeyboardArrowDown } from 'react-icons/md'

import { TextInputWithIcon, TextInputWithIconProps } from '../TextInputWithIcon/TextInputWithIcon'
import { OmitOnChangeHTMLInputAttributes } from '../TextInput/TextInput'
import { Omit } from '../utils/types'

export type SelectInputProps = Omit<TextInputWithIconProps, 'icon'>

export const SelectInput: React.FC<SelectInputProps & OmitOnChangeHTMLInputAttributes> = ({
  disabled,
  onChange,
  ...rest
}) => (
  <StyledSelectInput icon={<MdKeyboardArrowDown/>} onChange={onChange} {...rest} disabled isDisabled={disabled}/>
)

const StyledSelectInput = styled(TextInputWithIcon)<{ isDisabled?: boolean }>`
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

import React from 'react'
import styled, { css } from 'styled-components'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { matchThemeProp, globalInput } from '../utils/styled'

import { StyledInput } from '../TextInput/TextInput'
import { Icon } from '../Icon'

interface SelectInputProps {
  large?: boolean
  small?: boolean
  disabled?: boolean
  outlined?: boolean
}

const StyledContainer = styled.div <SelectInputProps> `
  ${globalInput};

  display: flex;
  justify-content: column;
  align-items: center;

  &:first-child {
    &[disabled] {
      cursor: default;
      box-shadow: none;
    }
  }

  ${props => props.disabled && css`
    cursor: not-allowed;
    box-shadow: inset 0 0 999em rgba(128, 128, 128, 0.2);

    &:first-child {
      box-shadow: inset 0 0 999em rgba(128, 128, 128, 0.2);

      &[disabled] {
        cursor: not-allowed;
      }
    }
  `}
`

const InputIcon = styled(Icon)<SelectInputProps>`
  font-size: ${matchThemeProp(theme => theme.global.sizes, {
    modifier: (em: number) => em * 20,
    defaultValue: 20
  })}px;
`

export const SelectInput: React.FC<SelectInputProps> = ({ disabled, outlined, small, large, ...rest }) => (
  <StyledContainer disabled={disabled} outlined={outlined} large={large} small={small}>
    <StyledSelectInput value='hallo' onChange={console.log} disabled large={large} small={small}/>
    <InputIcon large={large} small={small}><MdKeyboardArrowDown/></InputIcon>
  </StyledContainer>
)

const StyledSelectInput = styled(StyledInput)`
  height: 100%;
  padding: 0;
  border: none;

  &:hover {
    border: none;
  }
`

export default SelectInput

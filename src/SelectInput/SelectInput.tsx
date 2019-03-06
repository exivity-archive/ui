import React from 'react'
import styled, { css } from 'styled-components'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { matchThemeProp } from '../utils/theme'

import { StyledInput } from '../TextInput/TextInput'
import Icon from '../Icon'

interface SelectInputProps {
  large?: boolean
  small?: boolean
  disabled?: boolean
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: column;
  align-items: center;
`
const InputIcon = styled(Icon)<SelectInputProps>`
  font-size: ${matchThemeProp(theme => theme.global.sizes, {
    modifier: (em: number) => em * 16,
    defaultValue: 16
  })}px;
`

export const SelectInput: React.FC<SelectInputProps> = ({ small, large, ...rest }) => (
  <StyledContainer>
    <StyledSelectInput value='hallo' onChange={console.log} disabled large={large} small={small}/>
    <InputIcon large={large} small={small}><MdKeyboardArrowDown/></InputIcon>
  </StyledContainer>
)

const StyledSelectInput = styled(StyledInput)`
  width: 95%;

  &[disabled] {
    cursor: default;
    box-shadow: none;
  }
`

export default SelectInput

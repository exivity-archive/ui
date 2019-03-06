import React from 'react'
import styled, { css } from 'styled-components'
import { matchThemeProp, globalInput, fromTheme } from '../utils/styled'

import { StyledInput } from '../TextInput/TextInput'
import { Icon } from '../Icon'

interface SelectInputProps {
  large?: boolean
  small?: boolean
  disabled?: boolean
  outlined?: boolean
  icon?: any
}

const StyledContainer = styled.div <SelectInputProps> `
  position: relative;
  display: flex;
  justify-content: column;
  align-items: center;
  padding: 0px;
`
const InputIcon = styled(Icon)<SelectInputProps>`
  position: absolute;
  font-size: ${matchThemeProp(theme => theme.global.sizes, {
    modifier: (em: number) => em * 20,
    defaultValue: 20
  })}px;

  right: 0.5em;
`

export const TextInputWithIcon: React.FC<SelectInputProps> = ({ icon, disabled, outlined, small, large, ...rest }) => (
  <StyledContainer disabled={disabled} outlined={outlined} large={large} small={small}>
    <StyledSelectInput value='hallo' onChange={console.log} disabled={disabled} large={large} small={small}/>
    <InputIcon large={large} small={small}>{icon}</InputIcon>
  </StyledContainer>
)

const StyledSelectInput = styled(StyledInput)`
  height: 100%;
`

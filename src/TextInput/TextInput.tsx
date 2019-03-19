import React, { ChangeEvent, InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { globalInput, InputProps } from '../utils/styled'
import { Omit } from '../utils/types'

export type OmitOnChangeHTMLInputAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

export interface TextInputProps extends InputProps {
  value?: string
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void
}

export const StyledInput = styled.input`
  ${globalInput};
`

export const TextInput: React.FC<TextInputProps & OmitOnChangeHTMLInputAttributes> = ({ onChange, ...rest }) => (
  <StyledInput
    type='text'
    onChange={(event) => onChange && onChange(event.target.value, event)}
    {...rest}
  />
)

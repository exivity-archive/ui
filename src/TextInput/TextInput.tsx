import React, { ChangeEvent, InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { defaultStyledProps, globalInput, InputProps } from '../utils/styled'
import { Omit } from '../utils/types'

type OmitOnChange = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

interface TextInputProps extends InputProps {
  value: string
  onChange: (value: string, event: ChangeEvent<HTMLInputElement>) => void
}

export const TextInput: React.FC<TextInputProps & OmitOnChange> = ({ onChange, ...rest }) => (
  <StyledInput
    type='text'
    onChange={(event: any) => onChange(event.target.value, event)}
    {...rest}
  />
)

export const StyledInput = styled.input <TextInputProps> `
  ${globalInput};
`

TextInput.defaultProps = {
  ...defaultStyledProps,
  value: ''
}

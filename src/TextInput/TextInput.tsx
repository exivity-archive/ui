import React, { ChangeEvent, InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { defaultStyledProps, globalInput, InputProps } from '../utils/styled'
import { Omit } from '../utils/types'

type OmitOnChange = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

interface TextInputProps extends InputProps {
  value: string
  onChange: (value: string, event: ChangeEvent<HTMLInputElement>) => void
}

export const PlainTextInput: React.FC<TextInputProps & OmitOnChange> = ({ onChange, ...rest }) => (
  <input
    type='text'
    onChange={(event) => onChange(event.target.value, event)}
    {...rest}
  />
)

export const TextInput = styled(PlainTextInput)`
  ${globalInput};
`

TextInput.defaultProps = {
  ...defaultStyledProps,
  value: '',
  secondary: true
}

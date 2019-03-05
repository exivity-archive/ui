import React, { ChangeEvent, InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import defaultStyledProps from '../utils/testing/defaultStyledProps'
import { globalInput, InputProps } from '../utils/theme'
import { Omit } from '../utils/types'

type OmitOnChange = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

interface TextInputProps extends InputProps {
  value: string
  onChange: (value: string, event: ChangeEvent<HTMLInputElement>) => void
}

export const TextInput: React.FC<TextInputProps & OmitOnChange> = ({ onChange, ...rest }) => (
  <input
    type='text'
    onChange={(event) => onChange(event.target.value, event)}
    {...rest}
  />
)

const StyledTextInput = styled(TextInput)`
  ${globalInput};
`

StyledTextInput.defaultProps = {
  ...defaultStyledProps,
  value: '',
  secondary: true
}

export default StyledTextInput

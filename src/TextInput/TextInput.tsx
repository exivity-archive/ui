import * as React from 'react'
import styled from 'styled-components'
import defaultStyledProps from '../utils/testing/defaultStyledProps'
import { globalInput } from '../utils/theme'

interface ITextInputProps {
  value: string
  onChange: (value: string) => void

  outlined?: boolean

  // Purposes
  primary?: boolean
  secondary?: boolean
  success?: boolean
  danger?: boolean

  // Sizes
  small?: boolean
  large?: boolean
}

export const TextInput: React.FC<ITextInputProps> = ({ value, onChange, ...rest }) => (
  <input
    type='text'
    value={value}
    onChange={(event) => onChange(event.target.value)}
    {...rest}
  />
)

const StyledTextInput = styled(TextInput)`
  ${globalInput};

  height: 2.5em;

  &[type="checkbox"],
  &[type="radio"] {
    display: inline-block;
    width: auto;
    height: auto;
    padding: 0;
  }

  textarea & {
    padding: 0.5em;
    height: auto;
  }
`

StyledTextInput.defaultProps = {
  ...defaultStyledProps,
  value: '',
  secondary: true
}

export default StyledTextInput

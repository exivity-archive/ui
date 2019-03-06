import React, { TextareaHTMLAttributes, ChangeEvent } from 'react'
import styled, { css } from 'styled-components'
import { defaultStyledProps, globalInput, InputProps } from '../utils/styled'
import { Omit } from '../utils/types'

type OmitOnChange = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'>

interface TextAreaProps extends InputProps {
  onChange: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void
  width?: string
}

export const TextArea: React.FC<TextAreaProps & OmitOnChange> = ({ onChange, ...rest }) => (
  <textarea onChange={(event) => onChange(event.target.value, event)} {...rest}/>
)

const StyledTextArea = styled(TextArea)`
  ${globalInput};

  ${props => props.width && css`
    width: ${props.width}
  `}
`

StyledTextArea.defaultProps = {
  ...defaultStyledProps,
  value: '',
  secondary: true
}

export default StyledTextArea

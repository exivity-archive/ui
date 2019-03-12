import React, { ChangeEvent, TextareaHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import { inputStyles, StyledInputProps } from '../AbstractInput/AbstractInput'
import { Omit } from '../utils/types'

type OmitOnChange = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'>

interface TextAreaProps extends StyledInputProps {
  onChange: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void
  width?: string
}

export const StyledTextArea = styled.textarea<{ width?: string }>`
  ${inputStyles};

  ${props => props.width && css`
    width: ${props.width}
  `}
`

export const TextArea: React.FC<TextAreaProps & OmitOnChange> = ({ onChange, ...rest }) => (
  <StyledTextArea onChange={(event) => onChange(event.target.value, event)} {...rest} />
)

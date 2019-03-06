import React, { TextareaHTMLAttributes, ChangeEvent } from 'react'
import styled, { css } from 'styled-components'
import { defaultStyledProps, globalInput, InputProps } from '../utils/styled'
import { Omit } from '../utils/types'

type OmitOnChange = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'>

interface TextAreaProps extends InputProps {
  onChange: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void
  width?: string
}

export const PlainTextArea: React.FC<TextAreaProps & OmitOnChange> = ({ onChange, ...rest }) => (
  <textarea onChange={(event) => onChange(event.target.value, event)} {...rest}/>
)

export const TextArea = styled(PlainTextArea)`
  ${globalInput};

  ${props => props.width && css`
    width: ${props.width}
  `}
`

TextArea.defaultProps = {
  ...defaultStyledProps,
  value: '',
  secondary: true
}

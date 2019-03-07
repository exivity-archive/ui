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
  <StyledTextArea onChange={(event) => onChange(event.target.value, event)} {...rest}/>
)

export const StyledTextArea = styled('textarea') <{ width?: string }>`
  ${globalInput};

  ${props => props.width && css`
    width: ${props.width}
  `}
`

TextArea.defaultProps = {
  ...defaultStyledProps
}

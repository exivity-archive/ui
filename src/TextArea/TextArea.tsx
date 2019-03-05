import React, { TextareaHTMLAttributes, ChangeEvent } from 'react'
import styled, { css } from 'styled-components'
import defaultStyledProps from '../utils/testing/defaultStyledProps'
import { globalInput } from '../utils/theme'
import { Omit } from '../utils/types'

type OmitOnChange = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'>

interface TextAreaProps {
  onChange: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void
  width?: string
  outlined?: boolean
}

export const TextArea: React.FC<TextAreaProps & OmitOnChange> = ({ onChange, outlined, ...rest }) => (
  <textarea onChange={(event) => onChange(event.target.value, event)} {...rest}/>
)

const StyledTextArea = styled(TextArea)`
  ${globalInput}
  ${props => props.width && css`
    width: ${props.width}
  `}
`

StyledTextArea.defaultProps = {
  ...defaultStyledProps,
  value: ''
}

export default StyledTextArea

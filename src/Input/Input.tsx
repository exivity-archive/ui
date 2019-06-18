import React, { ChangeEvent, InputHTMLAttributes, useState, forwardRef, Ref, useRef, Dispatch } from 'react'

import { Omit } from '../utils/types'
import { StyledInputProps, StyledContainer, AnimatedStyledInput } from './styled'

const makeHandleChange = (onChange: OnChange | undefined, setValid: Dispatch<boolean>) => {
  return (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value, event)
      event.target.checkValidity && setValid(event.target.checkValidity())
    }
  }
}

export type OmitOnChangeHTMLInputAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

export type OnChange<T = string, E = HTMLInputElement> = (value: T, event: ChangeEvent<E>) => void

export interface InputProps extends StyledInputProps, OmitOnChangeHTMLInputAttributes {
  value?: string | number
  onChange?: OnChange
  required?: boolean
  ref?: React.RefObject<HTMLInputElement> | null
  disabled?: boolean
}

interface Props extends InputProps {
  step?: number | string
  type?: string
}

export const Input =
  forwardRef(({
    type = 'text',
    onChange,

    // Container props
    onClick,
    width,

    // Container and Input props
    inline,

    // Rest goes to Input
    ...rest
  }: Props, ref: Ref<HTMLInputElement>) => {
    const [valid, setValid] = useState(true)

    const containerRef = useRef<HTMLDivElement>(null)

    const container = { onClick, width, inline }

    return (
      <StyledContainer ref={containerRef} {...container}>
        <AnimatedStyledInput
          inline={inline}
          ref={ref}
          type={type}
          danger={!valid}
          onChange={makeHandleChange(onChange, setValid)}
          {...rest} />
      </StyledContainer>
    )
  })

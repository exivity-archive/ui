import React, { ChangeEvent, InputHTMLAttributes, useState, forwardRef, Ref, ReactNode, useRef, Dispatch, FC, useEffect } from 'react'

import { Omit } from '../utils/types'

import { StyledInputProps, StyledInputPrefixOrSuffixProps, StyledInputPrefixOrSuffix, StyledContainer, AnimatedStyledInput } from './styled'

interface InputPrefixOrSuffixProps extends StyledInputPrefixOrSuffixProps {
  registerWidth: Dispatch<number>
}

const InputPrefixOrSuffix: FC<InputPrefixOrSuffixProps> = ({ registerWidth, children, ...rest }) => {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (ref.current) {
      registerWidth(ref.current.getBoundingClientRect().width)
    }
  }, [ref])

  return <StyledInputPrefixOrSuffix ref={ref} {...rest}>{children}</StyledInputPrefixOrSuffix>
}

export type OmitOnChangeAndPrefixHTMLInputAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'prefix'>

export type OnChange<T = string, E = HTMLInputElement> = (value: T, event: ChangeEvent<E>) => void

export interface InputProps extends StyledInputProps, OmitOnChangeAndPrefixHTMLInputAttributes {
  value?: string | number
  onChange?: OnChange
  required?: boolean
  ref?: React.RefObject<HTMLInputElement> | null
  suffix?: ReactNode
  prefix?: ReactNode
  disabled?: boolean
}

interface Props extends InputProps {
  step?: number | string
  type?: string
}

export const Input: FC<Props> =
  forwardRef(({
    type,
    onChange,

    prefix,
    suffix,

    // Props for both TextInput & Prefix and Suffix
    tiny,
    small,
    large,
    huge,
    disabled,

    // Container props
    onClick,
    width,

    // Rest goes to TextInput
    ...rest
  }, ref: Ref<HTMLInputElement>) => {
    const [valid, setValid] = useState(true)

    const [paddingLeft, setPaddingLeft] = useState(0)
    const [paddingRight, setPaddingRight] = useState(0)

    const container = { onClick, width }
    const shared = { tiny, small, large, huge, disabled }

    return (
      <StyledContainer {...container}>
        <AnimatedStyledInput
          paddingLeft={paddingLeft}
          paddingRight={paddingRight}
          type={type || 'text'}
          ref={ref}
          danger={!valid}
          onChange={(event) => {
            onChange && onChange(event.target.value, event)
            event.target.checkValidity && setValid(event.target.checkValidity())
          }}
          {...shared}
          {...rest}
        />
        {!!prefix && (
          <InputPrefixOrSuffix registerWidth={setPaddingLeft} type='prefix' {...shared} >
            {prefix}
          </InputPrefixOrSuffix>
        )}
        {!!suffix && (
          <InputPrefixOrSuffix registerWidth={setPaddingRight} type='suffix' {...shared}>
            {suffix}
          </InputPrefixOrSuffix>
        )}
      </StyledContainer>
    )
  })

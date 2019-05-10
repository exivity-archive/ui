import React, { ChangeEvent, InputHTMLAttributes, useState, forwardRef, Ref, ReactNode, useRef, Dispatch, FC, useEffect, RefObject } from 'react'

import { Omit } from '../utils/types'

import { StyledInputProps, StyledInputPrefixOrSuffixProps, StyledInputPrefixOrSuffix, StyledContainer, AnimatedStyledInput } from './styled'

interface InputPrefixOrSuffixProps extends StyledInputPrefixOrSuffixProps {
  registerWidth: Dispatch<number>
  containerRef: RefObject<HTMLDivElement>
}

const InputPrefixOrSuffix: FC<InputPrefixOrSuffixProps> = ({ registerWidth, containerRef, children, type, ...rest }) => {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (ref.current && containerRef.current) {

      const rect = ref.current.getBoundingClientRect()
      const containerRect = containerRef.current.getBoundingClientRect()

      const offset = type === 'prefix'
        ? rect.left - containerRect.left
        : rect.right - containerRect.right

      registerWidth(rect.width + offset + 5)
    }
  }, [ref.current, containerRef.current])

  return <StyledInputPrefixOrSuffix ref={ref} type={type} {...rest}>{children}</StyledInputPrefixOrSuffix>
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

    // Props for both Input & Prefix and Suffix
    tiny,
    small,
    large,
    huge,
    disabled,

    // Container props
    onClick,
    width,

    // Container and Input props
    inline,

    // Rest goes to Input
    ...rest
  }, ref: Ref<HTMLInputElement>) => {
    const [valid, setValid] = useState(true)

    const containerRef = useRef<HTMLDivElement>(null)

    const [paddingLeft, setPaddingLeft] = useState<number | null>(null)
    const [paddingRight, setPaddingRight] = useState<number | null>(null)

    const container = { onClick, width, inline }
    const shared = { tiny, small, large, huge, disabled }

    return (
      <StyledContainer ref={containerRef} {...container}>
        <AnimatedStyledInput
          inline={inline}
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
          <InputPrefixOrSuffix
            registerWidth={setPaddingLeft}
            containerRef={containerRef}
            type='prefix'
            {...shared}>
            {prefix}
          </InputPrefixOrSuffix>
        )}
        {!!suffix && (
          <InputPrefixOrSuffix
            containerRef={containerRef}
            registerWidth={setPaddingRight}
            type='suffix'
            {...shared}>
            {suffix}
          </InputPrefixOrSuffix>
        )}
      </StyledContainer>
    )
  })

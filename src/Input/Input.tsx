import React, { ChangeEvent, InputHTMLAttributes, useState, forwardRef, Ref, ReactNode, useRef, Dispatch, FC, useEffect, RefObject } from 'react'

import { Omit } from '../utils/types'

import { StyledInputProps, StyledInputPreSuffixProps, StyledInputPreSuffix, StyledContainer, AnimatedStyledInput, PreSuffix } from './styled'
import { formatNumber } from './helpers'

interface InputPreSuffixProps extends StyledInputPreSuffixProps {
  registerPosition: Dispatch<number>
  containerRef: RefObject<HTMLDivElement>
}

const InputPreSuffix: FC<InputPreSuffixProps> = ({ registerPosition, containerRef, children, type, ...rest }) => {
  const preSuffixRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (preSuffixRef.current && containerRef.current) {

      const rect = preSuffixRef.current.getBoundingClientRect()
      const containerRect = containerRef.current.getBoundingClientRect()

      const offset = type === 'prefix'
        ? rect.left - containerRect.left
        : rect.right - containerRect.right

      registerPosition(rect.width + offset + 5)
    }
  }, [preSuffixRef.current, containerRef.current])

  return <StyledInputPreSuffix ref={preSuffixRef} type={type} {...rest}>{children}</StyledInputPreSuffix>
}

const makeHandleChange = (onChange: OnChange | undefined, setValid: Dispatch<boolean>, type: InputType) => {
  return (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const value = event.target.value
      if (type === 'number') {
        const match = value.match(/^[-+]?(?:[0-9 ]+,)*[0-9]+(?:\.[0-9]+)?$/)
        const isValid = !!match && match[0] === value

        isValid && onChange(formatNumber(value, ','), event)
        setValid(isValid)
      } else {
        onChange(value, event)
        event.target.checkValidity && setValid(event.target.checkValidity())
      }
    }
  }
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

type InputType = 'text' | 'number'

interface Props extends InputProps {
  step?: number | string
  type?: InputType
}

export const Input: FC<Props> =
  forwardRef(({
    type = 'text' as InputType,
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

    const renderPreSuffix = (type: PreSuffix, preSuffix: ReactNode, registerPosition: Dispatch<number>) => (
      <InputPreSuffix
        registerPosition={registerPosition}
        containerRef={containerRef}
        type={type}
        {...shared}>
        {preSuffix}
      </InputPreSuffix>
    )

    return (
      <StyledContainer ref={containerRef} {...container}>
        <AnimatedStyledInput
          inline={inline}
          paddingLeft={paddingLeft}
          paddingRight={paddingRight}
          ref={ref}
          danger={!valid}
          onChange={makeHandleChange(onChange, setValid, type)}
          {...shared}
          {...rest} />
        {!!prefix && renderPreSuffix('prefix', prefix, setPaddingLeft)}
        {!!suffix && renderPreSuffix('suffix', suffix, setPaddingRight)}
      </StyledContainer>
    )
  })

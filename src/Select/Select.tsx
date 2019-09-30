import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { BlockProps } from '../Block'
import { Dropdown, DropdownPlacement } from '../Dropdown'
import { SelectInput } from '../SelectInput'

import { SelectListData, SelectList } from '../SelectList'

const OptionsWrapper = styled.div<{ fullWidth: boolean }>`
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'}
`

const defaultInputValueAccessor = (item: any): string => {
  if (!item && item !== 0) {
    return ''
  }
  if (item.value) {
    return defaultInputValueAccessor(item.value)
  }
  if (item.toString) {
    return item.toString()
  }
  throw Error('Unexpected value. Custom `inputValueAccessor` should be defined')
}

interface InputComponentProps {
  value?: string
  name?: string
  placeholder?: string
  disabled?: boolean
  onClick: () => void
  onChange: () => void
}

export interface SelectProps<V> {
  value: V
  inputValueAccessor?: (value: V) => string
  InputComponent?: React.ComponentType<InputComponentProps>
  data?: V extends SelectListData ? V[] : never
  onChange?: V extends SelectListData ? ((item: V) => void) : never
  name?: string
  placeholder?: string
  disabled?: boolean,
  onOutsideClick?: (isOpen: boolean, close: () => void) => void
  useInputComponentWidth?: boolean
  children?: React.ReactElement
  open?: boolean | null
  onToggle?: (open: boolean) => void
}

export function Select <V = string> ({
  name,
  value,
  inputValueAccessor = defaultInputValueAccessor,
  open = null,
  onToggle = () => null,
  data,
  placeholder,
  onChange,
  useInputComponentWidth = true,
  onOutsideClick,
  InputComponent,
  children,
  py = 2,
  disabled = false,
  ...rest
}: SelectProps<V> & BlockProps) {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => {
    if (open === null) {
      setIsOpen(false)
    }
    onToggle(false)
  }

  useEffect(() => {
    if (open !== null) {
      setIsOpen(open)
    }
  }, [open])

  const inputComponentProps = {
    name,
    placeholder,
    value: value ? inputValueAccessor(value) : '',
    disabled,
    onClick: () => {
      if (disabled) return
      if (open === null) {
        setIsOpen(!isOpen)
      }
      onToggle(!isOpen)
    },
    onChange: () => null
  }

  useEffect(() => { disabled && close() }, [disabled])

  return (
    <Dropdown
      {...rest}
      py={py}
      open={isOpen}
      placement={DropdownPlacement.BOTTOM_START}
      useTriggerWidth={useInputComponentWidth}
      TriggerComponent={() => (
        InputComponent
          ? <InputComponent {...inputComponentProps}/>
          : <SelectInput {...inputComponentProps}/>
      )}
      onOutsideClick={
        () => onOutsideClick
          ? onOutsideClick(isOpen, close)
          : close()
      }>
        <OptionsWrapper fullWidth={useInputComponentWidth}>
          {children
            ? children
            : (
              <SelectList<V extends SelectListData ? V : never>
                value={value as V extends SelectListData ? V : never}
                data={data as any[] || []}
                onChange={(v) => {
                  onChange && onChange(v)
                  close()
                }}
              />
            )}
        </OptionsWrapper>
    </Dropdown>
  )
}

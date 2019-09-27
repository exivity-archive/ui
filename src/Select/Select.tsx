import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { BlockProps } from '../Block'
import { Dropdown, DropdownPlacement } from '../Dropdown'
import { SelectInput } from '../SelectInput'

import { SelectListData, SelectList } from '../SelectList'

const OptionsWrapper = styled.div<{ fullWidth: boolean }>`
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'}
`

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
  inputValueAccessor?: V extends string ? never : ((value: V) => string)
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
  inputValueAccessor = ((item: V) => item) as never,
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

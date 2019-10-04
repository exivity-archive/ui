import React, { useEffect, ComponentProps } from 'react'
import styled from 'styled-components'

import { SelectListData, SelectList } from './SelectList'
import { SelectInput } from './SelectInput'

import {
  BlockProps,
  Dropdown,
  DropdownProps,
  DropdownPlacement,
  useClosable
} from '..'

const OptionsWrapper = styled.div<{ fullWidth: boolean }>`
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
`

interface SelectData extends SelectListData {
  toString: Function
}

const defaultInputValueAccessor = (item?: SelectData): string => {
  if (!item && item !== 0) {
    return ''
  }
  if (item && item.value) {
    return item.value
  }
  if (item && item.toString) {
    return item.toString()
  }
  throw Error('Unexpected value. Custom `inputValueAccessor` should be defined')
}

export const SelectPlacement = DropdownPlacement

export interface SelectInputComponentProps {
  value?: string | number
  disabled?: boolean
  placeholder?: string
  name?: string
  onClick: ComponentProps<typeof SelectInput>['onClick']
}

export interface SelectProps<V> extends Pick<DropdownProps, 'placement'> {
  selected: V
  inputValueAccessor?: (item: V) => string
  InputComponent?: React.ComponentType<SelectInputComponentProps>
  data?: V extends SelectListData ? V[] : never
  onChange?: V extends SelectListData ? ((item: V) => void) : never
  name?: string
  placeholder?: string
  disabled?: boolean
  onOutsideClick?: (isOpen: boolean, close: () => void) => void
  useInputComponentWidth?: boolean
  children?: React.ReactElement
  open?: boolean | null
  defaultOpen?: boolean
  onToggle?: (open: boolean) => void
}

export function Select <V extends SelectData> ({
  name,
  selected,
  inputValueAccessor = defaultInputValueAccessor,
  open = null,
  defaultOpen = false,
  onToggle = () => null,
  data,
  placeholder,
  onChange,
  useInputComponentWidth = true,
  onOutsideClick,
  InputComponent = SelectInput,
  children,
  py = 2,
  disabled = false,
  placement = SelectPlacement.BOTTOM_START,
  ...rest
}: SelectProps<V> & BlockProps) {
  const { isOpen, toggle, close } = useClosable(defaultOpen, open, onToggle)
  useEffect(() => { if (disabled) close() }, [disabled])

  const inputProps = {
    readOnly: true,
    name,
    placeholder,
    value: inputValueAccessor(selected),
    disabled,
    onClick: () => { if (!disabled) toggle() }
  }

  return (
    <Dropdown
      {...rest}
      py={py}
      open={isOpen}
      placement={placement}
      useTriggerWidth={useInputComponentWidth}
      trigger={<InputComponent {...inputProps} />}
      onOutsideClick={() => {
        if (onOutsideClick) {
          onOutsideClick(isOpen, close)
        } else {
          close()
        }
      }}>
      <OptionsWrapper fullWidth={useInputComponentWidth}>
        {children || (
          <SelectList<V extends SelectListData ? V : never>
            value={selected as V extends SelectListData ? V : never}
            data={data as any[] || []}
            onChange={value => {
              onChange && onChange(value)
              close()
            }} />
        )}
      </OptionsWrapper>
    </Dropdown>
  )
}

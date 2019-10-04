import React, { useEffect, ComponentProps } from 'react'
import styled from 'styled-components'

import {
  BlockProps,
  Dropdown,
  DropdownPlacement,
  SelectListData,
  SelectList,
  SelectInput,
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

interface InputComponentProps {
  value?: string | number
  name?: string
  placeholder?: string
  disabled?: boolean
  onClick: ComponentProps<typeof SelectInput>['onClick']
}

export interface SelectProps<V extends SelectData> {
  selected: V
  inputValueAccessor?: typeof defaultInputValueAccessor
  InputComponent?: React.ComponentType<InputComponentProps>
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
  ...rest
}: SelectProps<V> & BlockProps) {
  const { isOpen, toggle, close } = useClosable(defaultOpen, open, onToggle)
  useEffect(() => { if (disabled) close() }, [disabled])

  const inputComponentProps = {
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
      placement={DropdownPlacement.BOTTOM_START}
      useTriggerWidth={useInputComponentWidth}
      trigger={<InputComponent {...inputComponentProps} />}
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

import React, { useEffect } from 'react'
import styled from 'styled-components'

import { BlockProps } from '../Block'
import { Dropdown, DropdownProps, DropdownPlacement } from '../Dropdown'
import { SelectInput } from '../SelectInput'
import { SelectListData, SelectList } from '../SelectList'
import { useClosable } from '../Dropdown/useClosable'

const OptionsWrapper = styled.div<{ fullWidth: boolean }>`
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
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

export const SelectPlacement = DropdownPlacement

export interface SelectInputComponentProps {
  value: string
  disabled: boolean
  onClick: () => void
  onChange: () => void
  placeholder?: string
  name?: string
}

type CloseDropdown = () => void

type ChildrenCallback = {
  close: CloseDropdown
}

export interface SelectProps<V> extends Pick<DropdownProps, 'placement'> {
  selected: V
  inputValueAccessor?: (item: V) => string
  inputComponent?: (props: SelectInputComponentProps) => JSX.Element
  data?: V extends SelectListData ? V[] : never
  onChange?: V extends SelectListData ? ((item: V) => void) : never
  name?: string
  placeholder?: string
  disabled?: boolean
  onOutsideClick?: (isOpen: boolean, close: CloseDropdown) => void
  useInputComponentWidth?: boolean
  children?: ((props: ChildrenCallback) => React.ReactNode) | React.ReactElement
  open?: boolean | null
  defaultOpen?: boolean
  onToggle?: (open: boolean) => void
}

export function Select <V = string> ({
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
  inputComponent,
  children,
  py = 2,
  disabled = false,
  placement = SelectPlacement.BOTTOM_START,
  ...rest
}: SelectProps<V> & BlockProps) {
  const { isOpen, toggle, close } = useClosable(defaultOpen, open, onToggle)
  useEffect(() => { if (disabled) close() }, [disabled])

  const inputProps = {
    name,
    placeholder,
    value: inputValueAccessor(selected),
    disabled,
    onClick: () => { if (!disabled) toggle() },
    onChange: () => null
  }

  return (
    <Dropdown
      {...rest}
      py={py}
      open={isOpen}
      placement={placement}
      useTriggerWidth={useInputComponentWidth}
      trigger={
        inputComponent
          ? inputComponent(inputProps)
          : <SelectInput {...inputProps} />
      }
      onOutsideClick={() => {
        if (onOutsideClick) {
          onOutsideClick(isOpen, close)
        } else {
          close()
        }
      }}
    >
      <OptionsWrapper fullWidth={useInputComponentWidth}>
        {
          typeof children === 'function'
            ? children({ close })
            : (
              children ||
              <SelectList<V extends SelectListData ? V : never>
                value={selected as V extends SelectListData ? V : never}
                data={data as any[] || []}
                onChange={(v) => {
                  onChange && onChange(v)
                  close()
                }}
              />
            )
        }
      </OptionsWrapper>
    </Dropdown>
  )
}

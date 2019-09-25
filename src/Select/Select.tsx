import React, { useState, cloneElement, ReactElement, useEffect, Ref } from 'react'
import styled from 'styled-components'

import { BlockProps } from '../Block'
import { Dropdown, DropdownPlacement } from '../Dropdown'
import { InputProps } from '../Input/Input'
import { SelectInput, SelectInputProps } from '../SelectInput'

import { SelectListProps, SelectListData, SelectList } from '../SelectList'

const OptionsWrapper = styled.div<{ fullWidth: boolean }>`
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'}
`

export interface OptionsProps extends Pick<SelectListProps, 'value' | 'data'> {
  close: () => void
  select: (item: SelectListData) => void
}

export interface SelectProps extends Pick<SelectListProps, | 'data'> {
  name?: string
  value?: SelectListData,
  placeholder?: string
  onOutsideClick?: (isOpen: boolean, close: Function) => void
  useInputComponentWidth?: boolean
  onChange: (value: any) => void
  test?: string,
  InputComponent?: React.ElementType<SelectInputProps>
  OptionsComponent?: React.ElementType<OptionsProps>
}

export const Select = ({
  name,
  value = { key: '', value: '' },
  data,
  placeholder,
  onChange,
  useInputComponentWidth = true,
  onOutsideClick,
  InputComponent,
  OptionsComponent,
  children,
  py = 2,
  disabled,
  ...rest
}: SelectProps & BlockProps & Omit<InputProps, 'value'>) => {
  if (children) {
    throw new Error('Usage of children is prohibited. To define custom ' +
    'options for <Select>, use `OptionsComponent` prop instead.')
  }

  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  const inputComponentProps = {
    ...rest,
    name,
    placeholder,
    value: value.value,
    disabled,
    onClick: () => !disabled && setIsOpen(!isOpen)
  }

  useEffect(() => { disabled && close() }, [disabled])

  return (
    <Dropdown
      {...rest}
      py={py}
      open={isOpen}
      placement={DropdownPlacement.BOTTOM_START}
      useTriggerWidth={useInputComponentWidth}
      renderTrigger={({ ref }) =>
        InputComponent
            ? <InputComponent {...inputComponentProps} ref={ref as any} />
            : <SelectInput {...inputComponentProps} ref={ref as Ref<HTMLInputElement>} />
      }
      onOutsideClick={
        () => onOutsideClick
          ? onOutsideClick(isOpen, close)
          : close()
      }>
        <OptionsWrapper fullWidth={useInputComponentWidth}>
          {OptionsComponent
            ? (
              <OptionsComponent
                close={close}
                select={(item: SelectListData) => {
                  onChange && onChange(item)
                }}
                value={value}
                data={data}
              />
            )
            : (
              <SelectList
                value={value.key ? value : undefined}
                data={data}
                onChange={(item: SelectListData) => {
                  onChange && onChange(item)
                  close()
                }}
              />
            )}
        </OptionsWrapper>
    </Dropdown>
  )
}

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { BlockProps } from '../Block'
import { Dropdown, DropdownPlacement } from '../Dropdown'
import { SelectInput, SelectInputProps } from '../SelectInput'

import { SelectListProps, SelectListData, SelectList } from '../SelectList'

const OptionsWrapper = styled.div<{ fullWidth: boolean }>`
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'}
`

interface ListData<D extends SelectListData> extends Pick<SelectListProps<D>, 'value' | 'data'> {}

type InputComponentProps = Partial<Omit<SelectInputProps, 'ref'>>

export interface OptionsProps<D extends SelectListData> extends ListData<D> {
  close: () => void
  select: (item: D) => void
}

export interface SelectProps<D extends SelectListData, I> extends ListData<D> {
  name?: string
  placeholder?: string
  disabled?: boolean,
  onOutsideClick?: (isOpen: boolean, close: () => void) => void
  useInputComponentWidth?: boolean
  onChange: (value: any) => void
  InputComponent?: React.ComponentType<I & { ref: React.Ref<any> }>
  inputComponentProps?: I,
  OptionsComponent?: React.ComponentType<OptionsProps<D>>
  children?: React.ReactChildren
}

export function Select <D extends SelectListData, I extends InputComponentProps> ({
  name,
  value,
  data,
  placeholder,
  onChange,
  useInputComponentWidth = true,
  onOutsideClick,
  InputComponent,
  inputComponentProps = {} as I,
  OptionsComponent,
  children,
  py = 2,
  disabled = false,
  ...rest
}: SelectProps<D, I> & BlockProps) {
  if (children) {
    throw new Error('Usage of children is prohibited. To define custom ' +
    'options for <Select>, use `OptionsComponent` prop instead.')
  }

  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  inputComponentProps = {
    name,
    placeholder,
    value: value ? value.value : '',
    disabled,
    onClick: () => !disabled && setIsOpen(!isOpen),
    onChange: () => null,
    ...inputComponentProps
  }

  useEffect(() => { disabled && close() }, [disabled])

  return (
    <Dropdown<I>
      {...rest}
      py={py}
      open={isOpen}
      placement={DropdownPlacement.BOTTOM_START}
      useTriggerWidth={useInputComponentWidth}
      TriggerComponent={InputComponent! || SelectInput}
      triggerComponentProps={inputComponentProps}
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
                select={(item: D) => {
                  onChange && onChange(item)
                }}
                value={value}
                data={data}
              />
            )
            : (
              <SelectList
                value={value}
                data={data}
                onChange={(item: D) => {
                  onChange && onChange(item)
                  close()
                }}
              />
            )}
        </OptionsWrapper>
    </Dropdown>
  )
}

import React, { useState, cloneElement, ReactElement, useEffect, Ref } from 'react'
import styled from 'styled-components'

import { BlockProps } from '../Block'
import { Dropdown, DropdownPlacement } from '../Dropdown'
import { InputProps } from '../Input/Input'
import { SelectInput } from '../SelectInput'

import { SelectListProps, SelectListData, SelectList } from '../SelectList'

interface InjectValueAndHandler {
  onClick: () => void
  name?: string
  value?: string
  placeholder?: string
  ref?: React.Ref<HTMLInputElement>
}

interface ChildProps extends Pick<SelectListProps, 'value' | 'data'> {
  close: () => void
}

export interface SelectProps extends Pick<SelectListProps, 'value' | 'data'> {
  name?: string
  placeholder?: string
  triggerComponent?: ReactElement<any>
  onOutsideClick?: (isOpen: boolean, close: Function) => void
  useTriggerComponentWidth?: boolean
  onChange?: (value: any) => void
  test?: string
  children?: (props: ChildProps) => ReactElement
}

export const injectComponent = (component: ReactElement<any>, props: InjectValueAndHandler) => {
  return cloneElement(component, {
    ...props,
    ...component.props
  })
}

const getTriggerComponent = (props: InjectValueAndHandler, ref: Ref<HTMLInputElement>, triggerComponent?: ReactElement<any>) => {
  if (triggerComponent) return injectComponent(triggerComponent, { ...props, ref })
  // Does not need onChange because SelectInput only display data
  return <SelectInput {...props} ref={ref} />
}

const OptionsWrapper = styled.div<{ fullWidth: boolean }>`
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'}
`

export const Select = ({
  name,
  value = { key: '', value: '' },
  data,
  placeholder,
  onChange,
  triggerComponent,
  useTriggerComponentWidth = true,
  onOutsideClick,
  children,
  py = 2,
  test,
  disabled,
  ...rest
}: SelectProps & BlockProps & Omit<InputProps, 'value'>) => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  const triggerComponentProps = {
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
      test={test}
      placement={DropdownPlacement.BOTTOM_START}
      useTriggerWidth={useTriggerComponentWidth}
      renderTrigger={({ ref }) => getTriggerComponent(
        { ...triggerComponentProps },
        ref as Ref<HTMLInputElement>,
        triggerComponent
      )}
      onOutsideClick={
        () => onOutsideClick
          ? onOutsideClick(isOpen, close)
          : setIsOpen(false)
      }>
        <OptionsWrapper fullWidth={useTriggerComponentWidth}>
          {children
            ? children({
              close: () => setIsOpen(false),
              value,
              data
            })
            : (
              <SelectList
                value={value.key ? value : undefined}
                onChange={(v: SelectListData) => {
                  onChange && onChange(v)
                  setIsOpen(false)
                }}
                data={data}
              />
            )}
        </OptionsWrapper>
    </Dropdown>
  )
}

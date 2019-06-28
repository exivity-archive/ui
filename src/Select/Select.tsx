import React, { useState, cloneElement, ReactElement } from 'react'

import { BlockProps } from '../Block'
import { Dropdown } from '../Dropdown'
import { InputProps } from '../Input/Input'
import { SelectInput } from '../SelectInput'

import { Vertical, Horizontal } from '../useSnapEdgeToParent'

interface InjectValueAndHandler {
  name?: string
  value?: string
  placeholder?: string
  onClick: () => void
}

export interface SelectProps {
  name?: string
  value?: string
  placeholder?: string
  valueComponent?: ReactElement<any>
  onOutsideClick?: (isOpen: boolean, close: Function) => void
  useTriggerComponentWidth?: boolean
  onChange?: (value: any) => void
  vertical?: Vertical
  horizontal?: Horizontal
  test?: string
  children: any
}

export const injectComponent = (component: ReactElement<any>, props: InjectValueAndHandler) => {
  return cloneElement(component, {
    ...props,
    ...component.props
  })
}

const getTriggerComponent = (props: InjectValueAndHandler, valueComponent?: ReactElement<any>) => {
  if (valueComponent) return injectComponent(valueComponent, props)
  // Does not need onChange because SelectInput only display data
  return <SelectInput {...props} />
}

export const Select = ({
  name,
  value,
  placeholder,
  onChange,
  valueComponent,
  useTriggerComponentWidth = true,
  onOutsideClick,
  vertical,
  horizontal,
  children,
  py = 2,
  test,
  ...rest
}: SelectProps & BlockProps & InputProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  const valueComponentProps = {
    // ...rest,
    name,
    placeholder,
    value,
    onClick: () => setIsOpen(!isOpen)
  }

  const triggerComponent = getTriggerComponent(valueComponentProps, valueComponent)

  return (
    <Dropdown {...rest} py={py}
      open={isOpen}
      data-test={test}
      vertical={vertical}
      horizontal={horizontal}
      triggerComponent={triggerComponent}
      useTriggerComponentWidth={useTriggerComponentWidth}
      onOutsideClick={
        () => onOutsideClick
          ? onOutsideClick(isOpen, close)
          : setIsOpen(false)
      }>
      {cloneElement(children, {
        ...children.props,
        onChange: (value: any) => {
          children.props.onChange && children.props.onChange(value)
          setIsOpen(false)
        }
      })}
    </Dropdown>
  )
}

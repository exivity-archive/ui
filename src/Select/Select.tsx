import React, { useState } from 'react'

import { SelectInput } from '../SelectInput'
import { Dropdown } from '../Dropdown'
import { Horizontal, Vertical } from '../Dropdown/helpers'
import { BlockProps } from '../Block'

interface InjectValueAndHandler {
  name?: string
  value?: string
  placeholder?: string
  onClick: () => void
}

export interface SelectProps extends BlockProps {
  name?: string
  value?: string
  placeholder?: string
  valueComponent?: React.ReactElement<any>
  onOutsideClick?: (isOpen: boolean, close: Function) => void
  useTriggerComponentWidth?: boolean
  onChange?: (value: any) => void
  vertical?: Vertical
  horizontal?: Horizontal
  test?: string
  children: any
}

export const injectComponent = (component: React.ReactElement<any>, props: InjectValueAndHandler) => {
  return React.cloneElement(component, {
    ...props,
    ...component.props
  })
}

const getTriggerComponent = (props: InjectValueAndHandler, valueComponent?: React.ReactElement<any>) => {
  if (valueComponent) return injectComponent(valueComponent, props)
  // Does not need onChange because SelectInput only display data
  return <SelectInput {...props}/>
}

export const Select: React.FC<SelectProps> = ({
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
    ...blockProps
  }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const close = () => setIsOpen(false)

  const valueComponentProps = {
    name,
    placeholder,
    value,
    key: isOpen ? 'open' : 'closed',
    onClick: () => setIsOpen(!isOpen)
  }

  const triggerComponent = getTriggerComponent(valueComponentProps, valueComponent)

  return (
    <Dropdown open={isOpen} vertical={vertical} horizontal={horizontal} {...blockProps} py={py}
              onOutsideClick={() => onOutsideClick ? onOutsideClick(isOpen, close) : setIsOpen(false)}
              triggerComponent={triggerComponent}
              useTriggerComponentWidth={useTriggerComponentWidth}
              test={test}>
      {React.cloneElement(children, {
        ...children.props,
        onChange: (value: any) => {
          children.props.onChange && children.props.onChange(value)
          setIsOpen(false)
        }
      })}
    </Dropdown>
  )
}

import React, { useState } from 'react'

import { SelectInput } from '../SelectInput'
import { Dropdown } from '../Dropdown'

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
  valueComponent?: React.ReactElement<any>
  useTriggerComponentWidth?: boolean
  onChange?: (value: any) => void
  children: React.FunctionComponentElement<any>
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
    children
  }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const valueComponentProps = {
    name,
    placeholder,
    value,
    onClick: () => setIsOpen(!isOpen)
  }

  const triggerComponent = getTriggerComponent(valueComponentProps, valueComponent)

  return (
      <Dropdown open={isOpen} triggerComponent={triggerComponent} useTriggerComponentWidth={useTriggerComponentWidth}>
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

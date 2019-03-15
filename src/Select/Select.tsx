import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { FixedSizeList as List } from 'react-window'

import { SelectInput } from '../SelectInput'
import { Dropdown } from '../Dropdown'

import { DefaultItem } from './DefaultItem'
import { calculateHeight, getSelectedItem, handleKeyDown, ITEM_HEIGHT } from './helpers'

interface SelectProps {
  value: string
  data: any[]
  valueComponent?: any
  itemComponent?: any
  useTriggerComponentWidth?: boolean
  innerElementType?: string
  onChange: any
}

export const StyledList = styled(List)`
  padding: 20px 0;

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
`
const injectComponent = (component: any, props: any) => React.cloneElement(component, {
  ...props,
  ...component.props
})

const getTriggerComponent = (valueComponent: any, props: any) => {
  if (valueComponent) return injectComponent(valueComponent, props)
  return <SelectInput {...props}/>
}

export const Select: React.FC<SelectProps> = ({
  value,
  data,
  onChange,
  valueComponent,
  itemComponent,
  useTriggerComponentWidth = true,
  innerElementType = 'ul'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectedItem = getSelectedItem(value, data)

  const valueComponentProps = {
    value: selectedItem.value,
    onClick: () => setIsOpen(!isOpen)
  }

  const triggerComponent = getTriggerComponent(valueComponent, valueComponentProps)
  const height = calculateHeight(data)

  const itemData = useMemo(() => ({ items: data, setIsOpen, onChange }), [data, setIsOpen])

  return (
    <div onKeyDown={handleKeyDown}>
      <Dropdown open={isOpen} triggerComponent={triggerComponent} useTriggerComponentWidth={useTriggerComponentWidth}>
        <StyledList
          height={height}
          itemData={itemData}
          itemCount={data.length}
          itemSize={ITEM_HEIGHT}
          innerElementType={innerElementType}
          width='100%'>
          {itemComponent ? itemComponent : DefaultItem}
        </StyledList>
      </Dropdown>
    </div>
  )
}

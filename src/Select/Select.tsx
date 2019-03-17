import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { FixedSizeList as List } from 'react-window'

import { SelectInput } from '../SelectInput'
import { Dropdown } from '../Dropdown'

import { DefaultItem } from './DefaultItem'
import { calculateHeight, getSelectedItem, handleKeyDownFocusListItem, ITEM_HEIGHT } from './helpers'

export interface SelectItem {
  key: string
  value: string
}

interface InjectValueAndHandler {
  value: string
  onClick: () => void
}

interface SelectProps {
  value: string
  data: SelectItem[]
  valueComponent?: React.ReactElement<any>
  useTriggerComponentWidth?: boolean
  innerElementType?: string
  onChange: (item: SelectItem) => void
  children?: any
}

export const StyledList = styled(List)`
  padding: 20px 0;

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
`

const injectComponent = (component: React.ReactElement<any>, props: InjectValueAndHandler) => {
  return React.cloneElement(component, {
    ...props,
    ...component.props
  })
}

const getTriggerComponent = (valueComponent: React.ReactElement<any>, props: InjectValueAndHandler) => {
  if (valueComponent) return injectComponent(valueComponent, props)
    // Does not need onChange because SelectInput only display data
  return <SelectInput {...props}/>
}

export const Select: React.FC<SelectProps> = ({
  value,
  data,
  onChange,
  valueComponent,
  useTriggerComponentWidth = true,
  innerElementType = 'ul',
  children
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const selectedItem = getSelectedItem(value, data)

  const valueComponentProps = {
    value: selectedItem ? selectedItem.value : '',
    onClick: () => setIsOpen(!isOpen)
  }

  const triggerComponent = getTriggerComponent(valueComponent, valueComponentProps)
  const height = calculateHeight(data)

  const itemData = useMemo(() => ({ items: data, setIsOpen, onChange }), [data, setIsOpen])

  return (
    <div onKeyDown={handleKeyDownFocusListItem}>
      <Dropdown open={isOpen} triggerComponent={triggerComponent} useTriggerComponentWidth={useTriggerComponentWidth}>
        <StyledList
          height={height}
          itemData={itemData}
          itemCount={data.length}
          itemSize={ITEM_HEIGHT}
          innerElementType={innerElementType}
          width='100%'>
          {children ? children : DefaultItem}
        </StyledList>
      </Dropdown>
    </div>
  )
}

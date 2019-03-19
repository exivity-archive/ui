import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { FixedSizeList as List } from 'react-window'

import { SelectInput } from '../SelectInput'
import { Dropdown } from '../Dropdown'
import { ListFocus } from '../ListFocus'

import { DefaultItem } from './DefaultItem'
import { calculateHeight, getSelectedItem, getNoDataPlaceholder, ITEM_HEIGHT, emptyFn } from './helpers'

export interface SelectItem {
  key: string
  value: string
}

interface InjectValueAndHandler {
  value: string
  onClick: () => void
}

interface SelectProps {
  name?: string
  value?: string
  placeholder?: string
  data: SelectItem[]
  valueComponent?: React.ReactElement<any>
  useTriggerComponentWidth?: boolean
  innerElementType?: string
  onChange?: (item: SelectItem) => void
  noDataText?: string
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
  data,
  onChange,
  valueComponent,
  useTriggerComponentWidth = true,
  innerElementType = 'ul',
  noDataText,
  children
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const componentData = getNoDataPlaceholder(data, noDataText)
  const selectedItem = getSelectedItem(value, componentData)

  const valueComponentProps = {
    name,
    placeholder,
    value: selectedItem ? selectedItem.value : '',
    onClick: () => setIsOpen(!isOpen)
  }

  const triggerComponent = getTriggerComponent(valueComponentProps, valueComponent)
  const height = calculateHeight(componentData)

  const itemData = useMemo(() => {
    if (!data.length) {
      return { items: componentData, setIsOpen: emptyFn, onChange: emptyFn }
    }

    return { items: componentData, setIsOpen, onChange }
  }, [data, setIsOpen])

  return (
    <ListFocus>
      <Dropdown open={isOpen} triggerComponent={triggerComponent} useTriggerComponentWidth={useTriggerComponentWidth}>
        <StyledList
          height={height}
          itemData={itemData}
          itemCount={componentData.length}
          itemSize={ITEM_HEIGHT}
          innerElementType={innerElementType}
          width='100%'>
          {children ? children : DefaultItem}
        </StyledList>
      </Dropdown>
    </ListFocus>
  )
}

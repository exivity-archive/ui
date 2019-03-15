import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { FixedSizeList as List } from 'react-window'

import { SelectInput } from '../SelectInput'
import { Dropdown } from '../Dropdown'

import { fromTheme, matchThemeProp } from '../utils/styled'

const NB_OF_ITEMS = 10
const ITEM_HEIGHT = 30
const MAX_HEIGHT = NB_OF_ITEMS * ITEM_HEIGHT

interface SelectProps {
  value: string
  data: any[]
  itemComponent: any
  useTriggerComponentWidth: boolean
  innerElementType?: string
  onChange: any
}

const StyledItem = styled.li`
  display: flex;
  align-items: center;

  font-family: ${fromTheme(theme => theme.global.fontFamily)};
  font-weight: 500;
  font-size: ${matchThemeProp(theme => theme.global.sizes, {
    modifier: (em: number) => em / 16 * 14
  })}em;

  &:hover, :focus {
    background-color: ${fromTheme(theme => theme.colours.lightGray)};
  }

  outline: none;
  cursor: pointer;
`

const StyledInnerItem = styled.div`
  display: flex;
  padding: 0 20px;
`

const StyledList = styled(List)`
  padding: 20px 0;

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
`

const focusElement = (event: any) => {
  event.target.focus()
}

const handleKeyDown = (event: any) => {
  const list = event.currentTarget.querySelector('ul')
  const first = list.querySelector('li:first-child')
  const last = list.querySelector('li:last-child')
  const focused = list.querySelector(':focus')

  // Prevent default action on our trigger keys (up/down arrow, enter)
  if ([38, 40, 13].indexOf(event.which) !== -1) {
    event.preventDefault()
  }

  // Perform actions for trigger keys
  switch (event.which) {
    // Down arrow key
    case 40:
      if (focused) {
        const next = focused.nextSibling
        if (!next) first.focus()
        if (next) {
          next.focus()
        } else {
          first && first.focus()
        }
      } else {
        first && first.focus()
      }
      break

    // Up arrow key
    case 38:
      if (focused) {
        const previous = focused.previousSibling
        if (previous) {
          previous.focus()
        } else {
          last && last.focus()
        }
      } else {
        last && last.focus()
      }
      break

    // Enter key
    case 13:
      if (focused) {
        focused.click()
      }
      break

    default:
  }
}

const DefaultItem = ({ data, index, style }: any) => {
  const { items, setIsOpen, onChange } = data
  const item = items[index]

  const handleOnClick = () => {
    setIsOpen(false)
    onChange(item)
  }

  style.top = style.top + 20

  return (
    <StyledItem style={style} tabIndex={index + 1} onClick={handleOnClick} onMouseOver={focusElement}>
      <StyledInnerItem>{item.value}</StyledInnerItem>
    </StyledItem>
  )
}

const calculateHeight = (data: any) => {
  const totalHeight = data.length * ITEM_HEIGHT
  return totalHeight < MAX_HEIGHT ? totalHeight : MAX_HEIGHT
}

const getSelectedItem = (key: string, data: any[]) => data.find((item: any) => item.key === key)

export const Select: React.FC<SelectProps> = ({ value, onChange, data, itemComponent, innerElementType = 'ul' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectedItem = getSelectedItem(value, data)

  const triggerComponent = <SelectInput value={selectedItem.value} onClick={() => setIsOpen(!isOpen)}/>
  const height = calculateHeight(data)

  const itemData = useMemo(() => ({ items: data, setIsOpen, onChange }), [data, setIsOpen])

  return (
    <div onKeyDown={handleKeyDown}>
      <Dropdown open={isOpen} triggerComponent={triggerComponent} useTriggerComponentWidth>
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

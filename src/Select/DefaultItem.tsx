import React from 'react'
import { ListChildComponentProps } from 'react-window'

import { ListItem, CenterText } from '../ListItem'
import { NO_DATA_KEY } from './helpers'

export const DefaultItem: React.FC<ListChildComponentProps> = ({ data, index, style }) => {
  const { items, setIsOpen, onChange } = data
  const item = items[index]

  const handleOnClick = () => {
    setIsOpen(false)
    onChange(item)
  }

  const newStyle = {
    ...style,
    top: typeof style.top === 'number' ? style.top + 20 : style.top
  }

  return (
    <ListItem style={newStyle} tabIndex={index + 1} onClick={handleOnClick} noDataPlaceholder={item.key === NO_DATA_KEY}>
      <CenterText>
        {item.value}
      </CenterText>
    </ListItem>
  )
}

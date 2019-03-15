import React from 'react'

import { ListItem } from '../ListItem'

export const DefaultItem = ({ data, index, style }: any) => {
  const { items, setIsOpen, onChange } = data
  const item = items[index]

  const handleOnClick = () => {
    setIsOpen(false)
    onChange(item)
  }

  style.top = style.top + 20

  return (
    <ListItem style={style} tabIndex={index + 1} onClick={handleOnClick}>
      {item.value}
    </ListItem>
  )
}

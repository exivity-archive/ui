import React, { CSSProperties } from 'react'

import { ListItem, CenterText } from '../ListItem'
import { SelectListData } from './SelectList'

import { NO_DATA_KEY } from './helpers'

export interface SelectListItemProps {
  data: { items: SelectListData[], onChange: (item: SelectListData) => void, selectedItem: SelectListData }
  index: number
  style: CSSProperties
}

export const DefaultItem: React.FC<SelectListItemProps> = ({ data, index, style }) => {
  const { items, onChange } = data
  const item = items[index]

  const handleOnClick = () => onChange && onChange(item)

  return (
    <ListItem style={style} tabIndex={index + 1} onClick={handleOnClick} noDataPlaceholder={item.key === NO_DATA_KEY}>
      <CenterText>
        {item.value}
      </CenterText>
    </ListItem>
  )
}

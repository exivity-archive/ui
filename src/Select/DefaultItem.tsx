import React from 'react'
import styled from 'styled-components'

import { ListItem } from '../ListItem'

const CenterText = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`

export const DefaultItem = ({ data, index, style }: any) => {
  const { items, setIsOpen, onChange } = data
  const item = items[index]

  const handleOnClick = () => {
    // setIsOpen(false)
    onChange(item)
  }

  style.top = style.top + 20

  return (
    <ListItem style={style} tabIndex={index + 1} onClick={handleOnClick}>
      <CenterText>
        {item.value}
      </CenterText>
    </ListItem>
  )
}

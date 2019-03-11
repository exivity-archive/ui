import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const TEST_ITEM = {
  name: 'Michiel',
  id: '353-324-6346'
}

const StyledItem = styled.li`

`

const Item = (select: any) => ({ data, index, onClick, style }: any) => (
  <StyledItem style={style} onClick={() => {
    select(data[index])
    onClick && onClick()
  }}>
    {data[index].value}
  </StyledItem>
)

const enrichData = (data: any, onSelect: any) => data.forEach((item: any) => {
  item.select = () => {
    onSelect(item)
    console.log(item)
  }
})

export const useSelectable = (data: any) => {
  const [list, setList] = useState(data)
  const [selected, onSelect] = useState(null)

  useEffect(() => {
    console.log('hi')
    enrichData(data, onSelect)
    setList(data)
  }, [data])

  return [selected, list]
}

// export const Select = () => {
//   const [selected, Item] = useSelectable()
//   console.log(selected)
//   return <Item data={TEST_ITEM}/>
// }

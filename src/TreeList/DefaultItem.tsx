import React, { CSSProperties, useMemo } from 'react'
import styled from 'styled-components'

import { TreeListItem } from '../useExpandable'
import { SelectListItem } from '../SelectList/SelectList'
import { ListItem } from '../ListItem'
import { Block } from '../Block'

const K = styled(Block)`
  display: flex;
  align-items: center;
  line-height: 22px;
  padding-top: 4px;
`

const ToggleExpandedButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 0;
  border: none;
  margin-right: 20px;
`

interface TreeListItemProps<Data extends TreeListItem<SelectListItem>> {
  data: { items: Data[], onChange: (item: Data) => void }
  style: CSSProperties
  index: number
  isScrolling: boolean
}

export function DefaultItem<
  Data extends TreeListItem<SelectListItem>
> ({ data, style, index }: TreeListItemProps<Data>) {
  const { items, onChange } = data
  const item = items[index]

  const handleChange = () => onChange && onChange(item)

  const button = (
    <ToggleExpandedButton onClick={item.expand}>
      {/* <Icon style={{ position: 'absolute', left: 0 }}>{item.expanded ? <MdRemove /> : <MdAdd />}</Icon> */}
    </ToggleExpandedButton>
  )

  return useMemo(() => {
    return (
      <ListItem style={style} onClick={handleChange}>
        <K>
          {button}{' ' + item.value}
        </K>
      </ListItem>
    )
  }, [item])
}

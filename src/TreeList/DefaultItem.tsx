import React, { CSSProperties, useMemo } from 'react'
import styled from 'styled-components'

import { TreeListItem } from '../useExpandable'
import { SelectListItem } from '../SelectList/SelectList'
import { ListItem } from '../ListItem'
import { ExpandableSpacer } from '../ExpandableSpacer'
import { fromTheme } from '../utils'

const StyledItem = styled.div`
  li:focus, :hover {
    button {
      outline: 5px solid ${fromTheme(theme => theme.colors.lightGray)};
    }
  }
`

const ToggleExpandedButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 0;
  outline: 5px solid white;
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
      <StyledItem>
        <ListItem style={style} onClick={handleChange}>
          <ExpandableSpacer
            index={index}
            data={items}
            button={button}>
            {item.value}
          </ExpandableSpacer>
        </ListItem>
      </StyledItem>
    )
  }, [item, index, items])
}

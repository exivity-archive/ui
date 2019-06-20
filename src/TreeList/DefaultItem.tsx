import React, { CSSProperties, useMemo } from 'react'
import styled from 'styled-components'

import { TreeListItem } from '../useExpandable'
import { SelectListItem } from '../SelectList/SelectList'
import { ListItem } from '../ListItem'
import { ExpandableSpacer } from '../ExpandableSpacer'
import { fromTheme } from '../utils'
import { Icon } from '../Icon'
import { MdRemove, MdAdd } from 'react-icons/md'

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

  padding: 0;
`

const ButtonIcon = styled(Icon)`
  svg {
    width: 100%;
    height: 100%;
    color: ${fromTheme(theme => theme.colors.gray)}
  }
`

export interface TreeListItemProps {
  data: { items: TreeListItem<SelectListItem>[], onChange: (item: TreeListItem<SelectListItem>) => void }
  style: CSSProperties
  index: number
  isScrolling: boolean
}

export function DefaultItem ({ data, style, index }: TreeListItemProps) {
  const { items, onChange } = data
  const item = items[index]

  const handleChange = () => onChange && onChange(item)

  const button = (
    <ToggleExpandedButton onClick={item.expand}>
      <ButtonIcon >{item.expanded ? <MdRemove /> : <MdAdd />}</ButtonIcon>
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

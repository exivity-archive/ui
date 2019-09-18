import React, { useMemo } from 'react'
import styled from 'styled-components'

import { FakeRecord } from './seed'

import { TreeListItemProps, DefaultItem, ToggleExpandedButton } from '../DefaultItem'
import { ListItem } from '../../ListItem'
import { BranchSpacer } from '../../BranchSpacer'
import { CHILDREN } from '../../utils/makeParentChildTree'
import { Button } from '../../Button'

export function CustomItem ({ data, style, index }: TreeListItemProps<FakeRecord>) {
  const { items, onChange } = data
  const item = items[index]

  const handleChange = () => onChange && onChange(item)

  return useMemo(() => {
    return (
      <ListItem style={style} onClick={handleChange}>
        <BranchSpacer spacing={20} index={index} data={items}>
          {item[CHILDREN] && <Button small onClick={item.expand}>{item.expanded ? 'Collapse' : 'Expand'}</Button>}
          {item.value}
        </BranchSpacer>
      </ListItem>
    )
  }, [item, index, items])
}

export const ModifiedDefaultItem = styled(DefaultItem)`
  ${ToggleExpandedButton} {
    svg {
      color: hotpink;
    }
  }
`

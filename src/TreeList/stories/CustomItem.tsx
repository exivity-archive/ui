import React, { useMemo } from 'react'

import { TreeListItem } from '../../useExpandable'
import { SelectListData } from '../../SelectList/SelectList'
import { TreeListItemProps } from '../DefaultItem'
import { ListItem } from '../../ListItem'
import { BranchSpacer } from '../../BranchSpacer'
import { CHILDREN } from '../../utils/makeParentChildTree'
import { Button } from '../../Button'

export function CustomItem<Data extends TreeListItem<SelectListData>> ({ data, style, index }: TreeListItemProps<Data>) {
  const { items, onChange } = data
  const item = items[index]

  const handleChange = () => onChange && onChange(item)

  return useMemo(() => {
    return (
      <ListItem style={style} onClick={handleChange}>
        <BranchSpacer
          spacing={20}
          index={index}
          data={items}>
          {item[CHILDREN] && (
            <Button onClick={item.expand}>
              {item.expanded ? 'Collapse' : 'Expand'}
            </Button>
          )}
          {item.value}
        </BranchSpacer>
      </ListItem>
    )
  }, [item, index, items])
}

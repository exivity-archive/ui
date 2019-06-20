import React, { ReactElement } from 'react'

import { SelectList } from '../SelectList'
import { SelectListProps, SelectListItem } from '../SelectList/SelectList'
import { useExpandable } from '../useExpandable'
import { DefaultItem, TreeListItemProps } from './DefaultItem'

interface TreeListProps {
  parentKeyAccessor: (item: SelectListItem) => string
  data: SelectListItem[]
  expandedKeys?: string[]
  children?: ReactElement<TreeListItemProps>
}

export function TreeList ({
  data,
  parentKeyAccessor,
  expandedKeys,
  ...rest
}: SelectListProps & TreeListProps) {
  const [expandableData] = useExpandable(data, parentKeyAccessor, expandedKeys)

  return (
    <SelectList data={expandableData} {...rest}>
      {DefaultItem}
    </SelectList>
  )
}

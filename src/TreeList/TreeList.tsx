import React, { ReactElement } from 'react'

import { SelectList } from '../SelectList'
import { SelectListProps, SelectListData } from '../SelectList/SelectList'
import { useExpandable, TreeListItem } from '../useExpandable'
import { DefaultItem, TreeListItemProps } from './DefaultItem'

interface TreeListProps<Data extends SelectListData> {
  parentKeyAccessor: (item: Data) => string
  data: Data[]
  expandedKeys?: string[]
  children?: ReactElement<TreeListItemProps<TreeListItem<Data>>>
}

export function TreeList<Data extends SelectListData> ({
  data,
  parentKeyAccessor,
  expandedKeys,
  children,
  ...rest
}: SelectListProps & TreeListProps<Data>) {
  const [expandableData] = useExpandable(data, parentKeyAccessor, expandedKeys)

  return (
    <SelectList data={expandableData} {...rest}>
      {children || DefaultItem}
    </SelectList>
  )
}

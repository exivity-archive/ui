import React from 'react'

import { SelectList } from '../SelectList'
import { SelectListProps, SelectListItem } from '../SelectList/SelectList'
import { useExpandable } from '../useExpandable'
import { DefaultItem } from './DefaultItem'

interface TreeListProps<Data extends SelectListItem> {
  parentKeyAccessor: (item: Data) => string
  data: Data[]
  expandedKeys?: string[]
}

export function TreeList<Data extends SelectListItem> ({
  data,
  parentKeyAccessor,
  expandedKeys,
  ...rest
}: SelectListProps & TreeListProps<Data>) {
  const [expandableData, helpers] = useExpandable(data, parentKeyAccessor, expandedKeys)

  return (
    <SelectList data={expandableData} {...rest}>
      {DefaultItem}
    </SelectList>
  )
}

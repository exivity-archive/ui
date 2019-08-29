import React, { Component, FC } from 'react'

import { SelectList } from '../SelectList'
import { SelectListProps, SelectListData } from '../SelectList/SelectList'
import { useExpandable } from '../useExpandable'
import { DefaultItem, TreeListItemProps } from './DefaultItem'

interface TreeListProps<Data extends SelectListData> {
  parentKeyAccessor: (item: Data) => string | null
  data: Data[]
  expandedKeys?: string[]
  children?: Component<TreeListItemProps<Data>> | FC<TreeListItemProps<Data>>
}

export function TreeList<Data extends SelectListData> ({
  data,
  parentKeyAccessor,
  expandedKeys,
  children,
  ...rest
}: SelectListProps<Data> & TreeListProps<Data>) {
  const [expandableData] = useExpandable(data, parentKeyAccessor, expandedKeys)

  return (
    <SelectList data={expandableData} {...rest}>
      {children || DefaultItem}
    </SelectList>
  )
}

export { ToggleExpandedButton } from './DefaultItem'

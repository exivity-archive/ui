import React from 'react'
import { SelectList } from '../SelectList'
import { SelectListProps, SelectListItem } from '../SelectList/SelectList'
import { useExpandable } from '../useExpandable'

interface TreeListProps<Data> {
  parentKeyAccessor: (item: Data) => string
  data: Data[]
  expandedKeys?: string[]
}

export function TreeList<Data extends SelectListItem = SelectListItem> ({
  data,
  parentKeyAccessor,
  expandedKeys,
  ...rest
}: SelectListProps & TreeListProps<Data>) {
  const [expandableData, helpers] = useExpandable(data, parentKeyAccessor, expandedKeys)

  return (
    <SelectList data={expandableData} {...rest}>
      {(props: any) => {
        console.log(props)
        return null
      }}
    </SelectList>
  )
}

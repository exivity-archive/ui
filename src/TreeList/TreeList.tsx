import React, { CSSProperties } from 'react'
import { SelectList } from '../SelectList'
import { SelectListProps, SelectListItem } from '../SelectList/SelectList'
import { useExpandable } from '../useExpandable'
import { ListItem, CenterText } from '../ListItem'

interface TreeListItemProps<
  Data extends SelectListItem,
  OnChange extends Function | undefined = undefined
  > {
  data: { items: Data[], onChange: OnChange }
  style: CSSProperties
  index: number
  isScrolling: boolean
}

function TreeListItem<
  Data extends SelectListItem,
  OnChange extends Function | undefined
> ({ data, style, index }: TreeListItemProps<Data, OnChange>) {
  const { items, onChange } = data
  const item = items[index]

  const handleOnClick = () => onChange && onChange(item)

  return (
    <ListItem>
      <CenterText>{item.value}</CenterText>
    </ListItem>
  )
}

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
      {TreeListItem}
    </SelectList>
  )
}

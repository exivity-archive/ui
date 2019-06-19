import React, { CSSProperties } from 'react'

import { DefaultItem as DefaultSelectListItem } from '../SelectList/DefaultItem'
import { TreeListItem } from '../useExpandable'
import { SelectListItem } from '../SelectList/SelectList'

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

  return (
    <DefaultSelectListItem index={index} style={style} data={data} />
  )
}

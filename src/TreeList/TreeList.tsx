import React, { FC, useMemo, ComponentType, useCallback } from 'react'
import { ReactElementType } from 'react-window'

import { calculateHeight, addKey } from './helpers'
import { DefaultItem, TreeListItemProps } from './DefaultItem'

import { useExpandable } from '../useExpandable'
import { ListFocus } from '../ListFocus'
import { StyledList } from '../SelectList'

const MAX_ITEMS_RENDERED = 10
const ITEM_HEIGHT = 30

interface TreeListProps<Data extends {}> {
  keyAccessor: (item: Data) => string

  data: Data[]
  parentKeyAccessor: (item: Data) => string | null
  expandedKeys?: string[]

  children?: ComponentType<TreeListItemProps<Data>> | FC<TreeListItemProps<Data>>

  value?: Data
  onChange?: (item: Data) => void

  itemHeight?: number
  maxItemsRendered?: number
  innerElementType?: ReactElementType
  width?: string | number
}

export function TreeList<Data extends {}> ({
  data,
  parentKeyAccessor,
  expandedKeys,
  children,
  keyAccessor,
  maxItemsRendered = MAX_ITEMS_RENDERED,
  itemHeight = ITEM_HEIGHT,
  onChange,
  value,
  innerElementType = 'ul',
  width = '100%'
}: TreeListProps<Data>) {
  const withKeys = useMemo(() => data.map(item => addKey(item, keyAccessor)), [data, keyAccessor])
  const [expandableData] = useExpandable(withKeys, parentKeyAccessor, expandedKeys)

  const height = calculateHeight(expandableData, itemHeight, maxItemsRendered)

  const handleChange = useCallback((newItem: Data & { key: string }) => {
    onChange && onChange(data.find(item => keyAccessor(item) === newItem.key)!)
  }, [onChange, data, keyAccessor])

  const itemData = useMemo(() => {
    return {
      items: expandableData,
      onChange: handleChange,
      selectedItem: value
    }
  }, [expandableData, value, handleChange])

  return (
    <ListFocus>
      <StyledList
        height={height}
        itemData={itemData}
        itemCount={expandableData.length}
        itemSize={itemHeight}
        innerElementType={innerElementType}
        width={width}>
        {children || DefaultItem}
      </StyledList>
    </ListFocus>
  )
}

export { ToggleExpandedButton } from './DefaultItem'

import React, { useMemo, ComponentType, useCallback } from 'react'
import { ReactElementType } from 'react-window'

import { calculateHeight, addKey, autoCalculateHeight } from './helpers'
import { DefaultItem, TreeListItemProps } from './DefaultItem'

import { useExpandable } from '../useExpandable'
import { ListFocus } from '../ListFocus'
import { StyledList } from '../SelectList'
import { useClientRect } from '../useClientRect'
import { BlockProps } from '../Block'

const MAX_ITEMS_RENDERED = 10
const ITEM_HEIGHT = 30

interface TreeListProps<Data extends {}> {
  keyAccessor: (item: Data) => string

  data: Data[]
  parentKeyAccessor: (item: Data) => string | null
  expandedKeys?: string[]

  children?: ComponentType<TreeListItemProps<Data>>

  value?: Data
  onChange?: (item: Data, e: React.MouseEvent<HTMLLIElement>) => void

  itemHeight?: number
  maxItemsRendered?: number | 'auto'
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
  width = '100%',
  height = '100%',
  ...blockProps
}: TreeListProps<Data> & BlockProps) {
  const withKeys = useMemo(() => data.map(item => addKey(item, keyAccessor)), [data, keyAccessor])
  const [expandableData] = useExpandable(withKeys, parentKeyAccessor, expandedKeys)

  const [containerRect, containerRef] = useClientRect()

  const listHeight = useMemo(() => {
    return maxItemsRendered === 'auto'
      ? autoCalculateHeight(data, containerRect, itemHeight)
      : calculateHeight(data, itemHeight, maxItemsRendered)
  }, [maxItemsRendered, data, containerRect && containerRect.height, itemHeight])

  const handleChange = useCallback((
    newItem: Data & { key: string },
    e: React.MouseEvent<HTMLLIElement>
  ) => {
    onChange && onChange(data.find(item => keyAccessor(item) === newItem.key)!, e)
  }, [onChange, data, keyAccessor])

  const itemData = useMemo(() => {
    return {
      items: expandableData,
      onChange: handleChange,
      selectedItem: value
    }
  }, [expandableData, value, handleChange])

  return (
    <ListFocus {...blockProps} height={height} width={width} ref={containerRef}>
      <StyledList
        height={listHeight}
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

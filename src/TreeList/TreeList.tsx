import React, { useMemo, ComponentType, useCallback } from 'react'
import { ReactElementType } from 'react-window'
import styled from 'styled-components'
import AutoSizer from 'react-virtualized-auto-sizer'

import { addKey } from './helpers'
import { DefaultItem, TreeListItemProps } from './DefaultItem'

import { useExpandable, ListFocus, StyledList, BlockProps } from '..'

const ITEM_HEIGHT = 30

const StyledListFocus = styled(ListFocus)`
  overflow-y: auto;
`

interface TreeListProps<Data extends {}> {
  keyAccessor: (item: Data) => string

  data: Data[]
  parentKeyAccessor: (item: Data) => string | null
  expandedKeys?: string[]

  children?: ComponentType<TreeListItemProps<Data>>

  value?: Data
  onChange?: (item: Data, e: React.MouseEvent<HTMLLIElement>) => void

  itemHeight?: number
  innerElementType?: ReactElementType
  width?: string | number
}

export function TreeList<Data extends {}> ({
  data,
  parentKeyAccessor,
  expandedKeys,
  children,
  keyAccessor,
  itemHeight = ITEM_HEIGHT,
  onChange,
  value,
  innerElementType = 'ul',
  width = '100%',
  ...blockProps
}: TreeListProps<Data> & BlockProps) {
  const withKeys = useMemo(() => data.map(item => addKey(item, keyAccessor)), [data, keyAccessor])
  const [expandableData] = useExpandable(withKeys, parentKeyAccessor, expandedKeys)

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

  const height = expandableData.length * itemHeight

  return (
    <StyledListFocus
      {...blockProps}
      height={height}
      maxHeight='100%'
      width={width}>
      <AutoSizer>
        {({ height, width }) => (
          <StyledList
            height={height}
            itemData={itemData}
            itemCount={expandableData.length}
            itemSize={itemHeight}
            innerElementType={innerElementType}
            width={width}>
            {children || DefaultItem}
          </StyledList>
        )}
      </AutoSizer>
    </StyledListFocus>
  )
}

export { ToggleExpandedButton } from './DefaultItem'

import React, { useMemo } from 'react'
import styled from 'styled-components'
import { FixedSizeList as List } from 'react-window'

import { ListFocus } from '../..'

import { DefaultItem } from './DefaultItem'
import { calculateHeight, getNoDataPlaceholder, ITEM_HEIGHT } from './helpers'

export interface SelectListData {
  key: string
  value: string
}

export interface SelectListProps<T extends SelectListData> {
  data: T[]
  value?: T
  width?: string | number
  innerElementType?: string
  onChange?: (item: T, e: React.MouseEvent<HTMLLIElement>) => void
  noDataText?: string
  children?: any
}

export const StyledList = styled(List)`
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
`
export function SelectList<T extends SelectListData> ({
  data,
  width,
  value,
  onChange,
  innerElementType = 'ul',
  noDataText,
  children
}: SelectListProps<T>) {
  const componentData = getNoDataPlaceholder(data, noDataText)
  const calculatedHeight = calculateHeight(componentData)

  const itemData = useMemo(() => {
    if (!data.length) {
      return { items: componentData }
    }

    return { items: componentData, onChange, selectedItem: value }
  }, [data, value, onChange])

  return (
    <ListFocus>
      <StyledList
        height={calculatedHeight}
        itemData={itemData}
        itemCount={componentData.length}
        itemSize={ITEM_HEIGHT}
        innerElementType={innerElementType}
        width={width || '100%'}>
        {children || DefaultItem}
      </StyledList>
    </ListFocus>
  )
}

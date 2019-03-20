import React, { useMemo } from 'react'
import styled from 'styled-components'
import { FixedSizeList as List } from 'react-window'

import { DefaultItem } from './DefaultItem'
import { ListFocus } from '../ListFocus'
import { calculateHeight, getNoDataPlaceholder, ITEM_HEIGHT } from './helpers'

export interface SelectListItem {
  key: string
  value: string
}

export interface SelectListProps {
  value?: string
  data: SelectListItem[]
  height?: string | number
  width?: string | number
  useTriggerComponentWidth?: boolean
  innerElementType?: string
  onChange?: (item: SelectListItem) => void
  noDataText?: string
  children?: any
}

export const StyledList = styled(List)`
  padding: 20px 0;

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
`

export const SelectList: React.FC<SelectListProps> = ({
  value,
  data,
  height,
  width,
  onChange,
  useTriggerComponentWidth = true,
  innerElementType = 'ul',
  noDataText,
  children
}) => {
  const componentData = getNoDataPlaceholder(data, noDataText)
  const calculatedHeight = calculateHeight(componentData)

  const itemData = useMemo(() => {
    if (!data.length) {
      return { items: componentData }
    }

    return { items: componentData, onChange }
  }, [data])

  return (
    <ListFocus>
      <StyledList
        height={height || calculatedHeight}
        itemData={itemData}
        itemCount={componentData.length}
        itemSize={ITEM_HEIGHT}
        innerElementType={innerElementType}
        width={width || '100%'}>
        {children ? children : DefaultItem}
      </StyledList>
    </ListFocus>
  )
}

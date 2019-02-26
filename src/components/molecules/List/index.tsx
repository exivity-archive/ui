import React, { memo } from 'react'
import memoize from 'memoize-one'
import { FixedSizeList, areEqual } from 'react-window'
import { useExpandableList } from './useExpandableList/useExpandableList'

interface FlatListProps {
    height: number
    width: number
    data: any[]
    itemSize: number
    children: any
}

export const Row = memo(({ data, index, style }: any) => {
    const item = data[index]

    return (
        <div
            onClick={() => console.log('click')}
            style={style}
        >
            {String(item.value)}
        </div>
    )
}, areEqual)

const createItemData = memoize((data: any) => data)

export const List: React.FC<FlatListProps> = ({ height, data, width, itemSize, children }) => {
    const props = useExpandableList(data, parent => parent.parentId)

    return (
        <FixedSizeList
            height={height}
            {...props}
            itemSize={itemSize}
            width={width}
        >
            {children}
        </FixedSizeList>
    )
}

export default List

List.displayName = 'List'
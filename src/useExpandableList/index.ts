import { useState } from 'react'
import memoizeOne from 'memoize-one'

import { createMap, Map } from '../helpers'
import { iterateAllParents, iterateAllChildren, PARENT, areEqual, CHILDREN } from './helpers'
import { IterateItem } from './helpers'

type ListItem<T> = T & IterateItem

interface Expanded {
    expanded: boolean
    originalIndex: number
}

type ExpandedItem<T> = Expanded & ListItem<T>

interface Expandable {
    expand(): void
}

type ExpandableItem<T> = Expandable & ExpandedItem<T>

type ParentKeyAccessor<T> = (mapItem: ListItem<T>) => string|null

export function transformAndOrder<T> (map: Map<T>, expanded: boolean): ExpandedItem<T>[] {
    return Object
        .values(map)
        .reduce((arr: ExpandedItem<any>[], next: ListItem<any>): ExpandedItem<any>[] => {
            const expandableItem = <ExpandedItem<any>>next
            if (!next[PARENT]) {
                expandableItem.expanded = expanded
                expandableItem.originalIndex = arr.length

                const addToArray: ExpandedItem<any>[] = [expandableItem]

                iterateAllChildren(next, (child: any) => {
                    const expandableChild = <ExpandedItem<any>>child
                    expandableChild.expanded = expanded
                    expandableChild.originalIndex = arr.length + addToArray.length

                    addToArray.push(expandableChild)
                })

                return arr.concat(addToArray)
            }

            return arr
        }, [])
}


// @Todo Type any of curried function
export const createParentChildrenMap =(
    data: ListItem<any>[],
    parentKeyAccessor: ParentKeyAccessor<any>
): Map<any> => {
    const map = createMap<ListItem<any>>(data)

    data.forEach((item) => {
        const mapItem = map[item.key]
        const parentKey = parentKeyAccessor(mapItem)
        const mapItemParent = parentKey && map[parentKey]

        if (mapItemParent) {
            mapItem[PARENT] = mapItemParent
            const parentChildren = mapItemParent[CHILDREN]

            if (parentChildren && !parentChildren.includes(mapItem)) {
                parentChildren.push(mapItem)
            } else {
                mapItemParent[CHILDREN] = [mapItem]
            }
        }
    })

    return map
}

export const memoizeTransFormAndOrder = memoizeOne((map: Map<any>, expanded: boolean) => {
    return transformAndOrder<any>(map, expanded)
})

export const memoizeCreateParentChildrenMap = memoizeOne((
    data: ListItem<any>[],
    parentKeyAccessor: ParentKeyAccessor<any>
) => {
    return createParentChildrenMap(data, parentKeyAccessor)
}, areEqual)

export function noCollapsedParents<T> (item: ExpandedItem<T>, list: ExpandedItem<T>[]) {
    let parentsNotCollapsed = true
    iterateAllParents(item, (parent: ExpandedItem<T>) => {
        const originalParent = list[parent.originalIndex]
        if (!originalParent.expanded) {
            parentsNotCollapsed = false
        }
    })
    return parentsNotCollapsed
}

export function getVisibleItems<T> (list: ExpandedItem<T>[]): ExpandedItem<T>[] {
    return list.filter((item) => {
        const noParentsCollapsed = noCollapsedParents(item, list)
        const noParent = !item[PARENT]
        return noParent || noParentsCollapsed
    })
}

export function enrichItems<T> (
    list: ExpandedItem<T>[],
    originalList: ExpandedItem<T>[],
    setList: Function
): ExpandableItem<T>[] {
    return list.map((item) => ({
        ...item,
        expand: function () {
            const originalItem = originalList[item.originalIndex]
            originalItem.expanded = !originalItem.expanded
            setList([...originalList])
        }
    }))
}

export function index<T> (
    data: ListItem<T>[],
    parentKeyAccessor: ParentKeyAccessor<T>,
    expanded: boolean = false
) {
    const parentChildrenMap: Map<T> = memoizeCreateParentChildrenMap(data, parentKeyAccessor)
    const expandableData: ExpandedItem<T>[] = memoizeTransFormAndOrder(parentChildrenMap, expanded)
    const [list, setList] = useState(expandableData)

    const visibleItems = getVisibleItems(list)
    const enrichedItems = enrichItems<T>(visibleItems, list, setList)

    return enrichedItems
}
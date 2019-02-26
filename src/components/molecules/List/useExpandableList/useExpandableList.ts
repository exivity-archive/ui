import { useState } from 'react'
import memoizeOne from 'memoize-one'

import { createMap } from '../helpers'
import { iterateAllParents, iterateAllChildren, PARENT, CHILDREN } from './helpers'
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

const isEqual = (newArgs: any, oldArgs: any) => {
    const newData = newArgs[0]
    const oldData = oldArgs[0]
    const newExpanded = newArgs[2]
    const oldExpanded = oldArgs[2]

    if (newData !== oldData || newExpanded !== oldExpanded) {
        return false
    }

    return true
}

// @Todo Type any of curried function
const createDataStructure = memoizeOne((
    data: ListItem<any>[],
    parentKeyAccessor: ParentKeyAccessor<any>,
    expanded: boolean
): ExpandedItem<any>[] => {
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
    }, isEqual)

function noCollapsedParents <T> (item: ExpandedItem<T>, list: ExpandedItem<T>[]) {
    let parentsNotCollapsed = true
    iterateAllParents(item, (parent: ExpandedItem<T>) => {
        const originalParent = list[parent.originalIndex]
        if (!originalParent.expanded) {
            parentsNotCollapsed = false
        }
    })
    return parentsNotCollapsed
}

function getVisibleItems<T> (list: ExpandedItem<T>[]): ExpandedItem<T>[] {
    return list.filter((item) => {
        const noParentsCollapsed = noCollapsedParents(item, list)
        const noParent = !item[PARENT]
        return noParent || noParentsCollapsed
    })
}

function enrichItems<T> (
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

export function useExpandableList<T> (
    data: ListItem<T>[],
    parentKeyAccessor: ParentKeyAccessor<T>,
    expanded: boolean = false
) {
    const expandableData: ExpandedItem<T>[] = createDataStructure(data, parentKeyAccessor,  expanded)
    const [list, setList] = useState(expandableData)

    const visibleItems = getVisibleItems(list)
    const enrichedItems = enrichItems<T>(visibleItems, list, setList)

    return {
        itemData: enrichedItems,
        itemCount: enrichedItems.length
    }
}
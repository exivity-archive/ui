import { useState } from 'react'
import memoizeOne from 'memoize-one'

import { createMap, Map } from '../helpers'

import {
  IterateItem,
  iterateAllParents,
  iterateAllChildren,
  PARENT,
  CHILDREN,
  areEqual
} from './helpers'

type ListItem<T> = T & IterateItem

interface Expanded {
  expanded: boolean
  originalIndex: number
}

type ExpandedItem<T> = Expanded & ListItem<T>

interface Expandable {
  expand (): void
}

type ExpandableItem<T> = Expandable & ExpandedItem<T>

type ParentKeyAccessor<T> = (mapItem: ListItem<T>) => string | null

type ExpandedCallback<T> = (mapItem: ListItem<T>) => boolean

export function transformAndOrder<T> (map: Map<T>, expanded: boolean | ExpandedCallback<T>): ExpandedItem<T>[] {
  return Object
    .values(map)
    .reduce((arr: ExpandedItem<any>[], next: ListItem<any>): ExpandedItem<any>[] => {
      const expandableItem = next as ExpandedItem<any>
      if (!next[PARENT]) {
        expandableItem.expanded = typeof expanded === 'function' ? expanded(next) : expanded
        expandableItem.originalIndex = arr.length

        const addToArray: ExpandedItem<any>[] = [expandableItem]

        iterateAllChildren(next, (child: any) => {
          const expandableChild = child as ExpandedItem<any>
          expandableChild.expanded = typeof expanded === 'function' ? expanded(child) : expanded
          expandableChild.originalIndex = arr.length + addToArray.length

          addToArray.push(expandableChild)
        })

        return arr.concat(addToArray)
      }

      // If it doesn't have parent or children it is related to other logic or hook
      if (!next.hasOwnProperty(PARENT) && !next.hasOwnProperty(CHILDREN)) {
        return arr.concat([next])
      }

      return arr
    }, [])
}

// @Todo Type any of curried function
export const createParentChildrenMap = (
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

export const memoizeTransFormAndOrder = memoizeOne((map: Map<any>, expanded: boolean | ExpandedCallback<any>) => {
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

export function useExpandableList<T> (
  data: ListItem<T>[],
  parentKeyAccessor: ParentKeyAccessor<T>,
  expanded: boolean | ExpandedCallback<T> = false
) {
  const parentChildrenMap: Map<T> = memoizeCreateParentChildrenMap(data, parentKeyAccessor)
  const expandableData: ExpandedItem<T>[] = memoizeTransFormAndOrder(parentChildrenMap, expanded)
  const [list, setList] = useState(expandableData)

  const visibleItems = getVisibleItems<T>(list)
  return enrichItems<T>(visibleItems, list, setList)
}

import { useMemo, useState } from 'react'

import { createMap, Map } from '../utils'
import { CHILDREN, iterateAllChildren, iterateAllParents, IterateItem, PARENT } from './helpers'

type ListItem<T> = T & IterateItem

interface Expanded {
  expanded: boolean
  index: number
}

type ExpandedItem<T> = Expanded & ListItem<T>

interface Expandable {
  expand (): void
}

export type ExpandableItem<T> = Expandable & ExpandedItem<T>

type ParentKeyAccessor<T> = (mapItem: ListItem<T>) => string | null

type ExpandedCallback<T> = (mapItem: ListItem<T>) => boolean

export function transformAndOrder<T> (
  map: Map<ListItem<T>>,
  expanded: boolean | ExpandedCallback<T>
): ExpandedItem<T>[] {
  return Object
    .values(map)
    .reduce((arr: ExpandedItem<T>[], next: ListItem<T>): ExpandedItem<T>[] => {
      const expandableItem = next as ExpandedItem<T>

      if (!next[PARENT]) {
        expandableItem.expanded = typeof expanded === 'function' ? expanded(next) : expanded
        expandableItem.index = arr.length
        const addToArray: ExpandedItem<T>[] = [expandableItem]

        iterateAllChildren(next, (child: ExpandedItem<T>) => {
          child.expanded = typeof expanded === 'function' ? expanded(child) : expanded
          child.index = arr.length + addToArray.length
          addToArray.push(child)
        })

        return arr.concat(addToArray)
      }

      return arr
    }, [])
}

export function createParentChildrenMap<T> (
  data: ListItem<T>[],
  parentKeyAccessor: ParentKeyAccessor<T>
): Map<ListItem<T>> {
  const map = createMap<ListItem<T>>(data)

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

export function noCollapsedParents<T> (item: ExpandedItem<T>, list: ExpandedItem<T>[]) {
  let parentsNotCollapsed = true

  iterateAllParents(item, (parent: ExpandedItem<T>) => {
    const originalParent = list[parent.index]
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
  setList: Function
): ExpandableItem<T>[] {
  list.forEach((item, index) => {
    const expandableItem = item as ExpandableItem<T>

    expandableItem.expand = function () {
      const newList = [...list]
      const newItem = { ...list[index] }
      newItem.expanded = !newItem.expanded
      newList[index] = newItem
      setList([...newList])
    }
  })

  return list as ExpandableItem<T>[]
}

export function useExpandable<T> (
  data: ListItem<T>[],
  parentKeyAccessor: ParentKeyAccessor<T>,
  expanded: boolean | ExpandedCallback<T> = false
) {
  const initialState: ExpandedItem<T>[] = []
  const [list, setList] = useState(initialState)

  useMemo(() => {
    const parentChildrenMap: Map<ListItem<T>> = createParentChildrenMap<T>(data, parentKeyAccessor)
    const expandableData: ExpandedItem<T>[] = transformAndOrder<T>(parentChildrenMap, expanded)
    setList(expandableData)
  }, [data])

  const enriched = enrichItems<T>(list, setList)
  return getVisibleItems<T>(enriched)
}

export { iterateAllChildren, iterateAllParents } from './helpers'

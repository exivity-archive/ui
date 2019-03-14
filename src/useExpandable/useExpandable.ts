import { useMemo, useState, useEffect } from 'react'

import {
  PARENT,
  CHILDREN,
  TreeItem,
  TreeListItem,
  iterateAllChildren,
  createExpandOrCollapseTreeHelpers,
  expandOrCollapseItem,
  hasNoCollapsedParents,
  disableEnumerable,
  Helpers
} from './helpers'

import { createMap, Map, ListItem } from '../utils'

type ParentKeyAccessor<T> = (mapItem: TreeItem<T>) => string | null

export function createParentChildrenMap<T> (
  data: ListItem<T>[],
  parentKeyAccessor: ParentKeyAccessor<T>
): Map<TreeItem<T>> {
  const map = createMap<T>(data)

  data.forEach((item) => {
    const mapItem = map[item.key] as TreeItem<T>
    const parentKey = parentKeyAccessor(mapItem)
    const parent = parentKey && map[parentKey] as TreeItem<T>

    if (parent) {
      mapItem[PARENT] = parent
      const parentChildren = parent[CHILDREN]

      if (!parentChildren) {
        parent[CHILDREN] = [mapItem]
      } else if (!parentChildren.includes(mapItem)) {
        parentChildren.push(mapItem)
      }
    }
  })

  return map
}

export function orderChildrenUnderParents<T> (map: Map<TreeItem<T>>): TreeItem<T>[] {
  return Object
    .values(map)
    .reduce((list: TreeItem<T>[], item: TreeItem<T>): TreeItem<T>[] => {

      if (!item[PARENT]) {
        const addToList: TreeItem<T>[] = [item]

        iterateAllChildren(item, (child: TreeItem<T>) => {
          addToList.push(child)
        })

        return list.concat(addToList)
      }

      return list
    }, [])
}

export function createTree<T> (data: ListItem<T>[], parentKeyAccessor: ParentKeyAccessor<T>): TreeItem<T>[] {
  const parentChildrenMap: Map<TreeItem<T>> = createParentChildrenMap<T>(data, parentKeyAccessor)
  return orderChildrenUnderParents<T>(parentChildrenMap)
}

export function enrichTreeItems<T> (list: TreeItem<T>[], expanded: string[], setExpanded: any): TreeListItem<T>[] {
  return list.map((item: TreeItem<T>): TreeListItem<T> => ({
    ...item,
    expand: () => expandOrCollapseItem(item.key, expanded, setExpanded)
  }))
}

export function getVisibleItems<T> (list: TreeListItem<T>[], expanded: string[]): TreeListItem<T>[] {
  return list.filter((item) => {
    const hasNoParentsCollapsed = hasNoCollapsedParents<T>(item, expanded)
    const hasNoParent = !item[PARENT]
    return hasNoParent || hasNoParentsCollapsed
  }).map((item) => {
    if (item[PARENT]) disableEnumerable(item, PARENT)
    if (item[CHILDREN]) disableEnumerable(item, CHILDREN)
    disableEnumerable(item, 'expand')

    return item
  })
}

type UseExpandableReturn<T> = [
  TreeListItem<T>[],
  Helpers<T>
]

export function useExpandable<T> (
  data: ListItem<T>[],
  parentKeyAccessor: ParentKeyAccessor<T>,
  expandedKeys?: string[]
): UseExpandableReturn<T> {
  const [expanded, setExpanded] = useState<string[]>(expandedKeys ? expandedKeys : [])
  const [list, setList] = useState<TreeItem<T>[]>(createTree<T>(data, parentKeyAccessor))

  useEffect(() => {
    expandedKeys && setExpanded(expandedKeys)
  }, [expandedKeys])

  useEffect(() => {
    const treeList: TreeItem<T>[] = createTree<T>(data, parentKeyAccessor)
    setList(treeList)
  }, [data])

  return useMemo(() => {
    const result = []
    const enriched: TreeListItem<T>[] = enrichTreeItems<T>(list, expanded, setExpanded)

    result[0] = getVisibleItems<T>(enriched, expanded)
    result[1] = createExpandOrCollapseTreeHelpers<T>(expanded, setExpanded)

    return result as UseExpandableReturn<T>
  }, [list, expanded])
}

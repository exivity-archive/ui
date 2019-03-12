import { useMemo, useState, useEffect } from 'react'

import { createMap, Map } from '../utils'
import { CHILDREN, iterateAllChildren, iterateAllParents, TreeItem, PARENT } from './helpers'

type TreeListItem<T> = T & TreeItem

interface Expandable {
  expand (): void
}

type ExpandableTreeListItem<T> = Expandable & TreeListItem<T>

type ParentKeyAccessor<T> = (mapItem: TreeListItem<T>) => string | null

export function orderChildrenUnderParents<T> (map: Map<TreeListItem<T>>): TreeListItem<T>[] {
  return Object
    .values(map)
    .reduce((list: TreeListItem<T>[], item: TreeListItem<T>): TreeListItem<T>[] => {

      if (!item[PARENT]) {
        const addToList: TreeListItem<T>[] = [item]

        iterateAllChildren(item, (child: TreeListItem<T>) => {
          addToList.push(child)
        })

        return list.concat(addToList)
      }

      return list
    }, [])
}

export function createParentChildrenMap<T> (
  data: TreeListItem<T>[],
  parentKeyAccessor: ParentKeyAccessor<T>
): Map<TreeListItem<T>> {
  const map = createMap<TreeListItem<T>>(data)

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

export function hasNoCollapsedParents<T> (item: TreeListItem<T>, expanded: string[]): boolean {
  let parentsAreNotCollapsed = true

  iterateAllParents(item, (parent: TreeListItem<T>) => {
    if (!expanded.includes(parent.key)) {
      parentsAreNotCollapsed = false
    }
  })

  return parentsAreNotCollapsed
}

export function getVisibleItems<T> (list: TreeListItem<T>[], expanded: string[]): TreeListItem<T>[] {
  return list.filter((item) => {
    const hasNoParentsCollapsed = hasNoCollapsedParents(item, expanded)
    const hasNoParent = !item[PARENT]
    return hasNoParent || hasNoParentsCollapsed
  })
}

const handleExpand = (key: string, expanded: string[], setExpanded: any) => {
  if (expanded.includes(key)) {
    setExpanded(expanded.filter(item => item !== key))
  } else {
    setExpanded(expanded.concat([key]))
  }
}

export function enrichItems<T> (list: TreeListItem<T>[], expanded: string[], setExpanded: any): ExpandableTreeListItem<T>[] {
  return list.map((item: TreeListItem<T>) => {
    const expandableTreeItem = item as ExpandableTreeListItem<T>

    return {
      ...expandableTreeItem,
      expand: function () {
        handleExpand(expandableTreeItem.key, expanded, setExpanded)
      }
    }
  })
}

export function createTree<T> (data: TreeListItem<T>[], parentKeyAccessor: ParentKeyAccessor<T>): TreeListItem<T>[] {
  const parentChildrenMap: Map<TreeListItem<T>> = createParentChildrenMap<T>(data, parentKeyAccessor)
  return orderChildrenUnderParents<T>(parentChildrenMap)
}

export function useExpandable<T> (
  data: TreeListItem<T>[],
  parentKeyAccessor: ParentKeyAccessor<T>,
  expandedKeys?: string[]
) {
  const [expanded, setExpanded] = useState<string[]>([])
  const [list, setList] = useState(data)

  useEffect(() => {
    expandedKeys && setExpanded(expandedKeys)
  }, [expandedKeys])

  useEffect(() => {
    const treeList = createTree<T>(data, parentKeyAccessor)
    setList(treeList)
  }, [data])

  return useMemo(() => {
    const expand = {
      parents: function (item: any) {
        const keys: string[] = [item.key]

        iterateAllParents(item, (parent: TreeListItem<T>) => {
          if (!expanded.includes(parent.key)) {
            keys.push(parent.key)
          }
        })

        setExpanded(expanded.concat(keys))
      },
      children: function (item: any) {
        const keys: string[] = [item.key]

        iterateAllChildren(item, (child: TreeListItem<T>) => {
          if (!expanded.includes(child.key)) {
            keys.push(child.key)
          }
        })

        setExpanded(expanded.concat(keys))
      }
    }

    const collapse = {
      parents: function (item: any) {
        const keys: string[] = [item.key]

        iterateAllParents(item, (parent: TreeListItem<T>) => {
          if (expanded.includes(parent.key)) {
            keys.push(parent.key)
          }
        })

        setExpanded(expanded.filter(key => !keys.includes(key)))
      },
      children: function (item: any) {
        const keys: string[] = [item.key]

        iterateAllChildren(item, (child: TreeListItem<T>) => {
          if (expanded.includes(child.key)) {
            keys.push(child.key)
          }
        })

        setExpanded(expanded.filter(key => !keys.includes(key)))
      }
    }

    const enriched = enrichItems<T>(list, expanded, setExpanded)
    return [getVisibleItems(enriched, expanded), { expand, collapse }]
  }, [list, expanded])
}

import { useMemo, useState, useEffect } from 'react'

import {
  TreeListItem,
  createExpandOrCollapseTreeHelpers,
  expandOrCollapseItem,
  hasNoCollapsedParents,
  Helpers
} from './helpers'

import {
  makeParentChildTree,
  ParentKeyAccessor,
  TreeItem,
  PARENT,
  CHILDREN
} from '../utils/makeParentChildTree'
import { ListItem } from '../utils'
import { disableEnumerable } from '../utils/disableEnumerable'

export function enrichTreeItems<T> (list: TreeItem<T>[], expanded: string[], setExpanded: any): TreeListItem<T>[] {
  return list.map((item: TreeItem<T>): TreeListItem<T> => ({
    ...item as TreeItem<T> & { level: number },
    expanded: expanded.includes(item.key),
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
    disableEnumerable(item, 'expanded')
    disableEnumerable(item, 'level')

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
  const [list, setList] = useState<TreeItem<T>[]>(makeParentChildTree<T>(data, parentKeyAccessor))

  useEffect(() => {
    expandedKeys && setExpanded(expandedKeys)
  }, [expandedKeys])

  useEffect(() => {
    const treeList: TreeItem<T>[] = makeParentChildTree<T>(data, parentKeyAccessor)
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

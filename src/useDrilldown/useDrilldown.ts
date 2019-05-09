import { useMemo, useState, useEffect, Dispatch } from 'react'
import {
  drilldownFn,
  replaceFn,
  getHiddenSiblingsFn,
  getVisibleSiblingsFn,
  removeFn,
  disableEnumerables,
  separateVisibleAndHiddenChildren,
  Children
} from './helpers'
import { TreeItem, ParentKeyAccessor, makeParentChildTree, CHILDREN } from '../utils/makeParentChildTree'
import { ListItem } from '../utils'

export type DrilldownItem<T> = T & TreeItem<T> & Children<T> & {
  drilldown: () => void
  replace: (newSibling: DrilldownItem<T>) => void
  getHiddenSiblings: () => TreeItem<T>[]
  getVisibleSiblings: () => TreeItem<T>[]
  remove: () => void
}

export function getAndEnrichVisibleItems<T> (list: TreeItem<T>[], visible: string[], setVisible: Dispatch<string[]>): DrilldownItem<T>[] {

  return visible.map((key: string): DrilldownItem<T> => {
    const item = list.find(item => item.key === key)!

    const children = separateVisibleAndHiddenChildren(item[CHILDREN] || [], visible)

    const enrichedItem = {
      ...item,
      ...children,
      drilldown: () => drilldownFn(item, children.hiddenChildren[0], visible, setVisible),
      replace: (newSibling: TreeItem<T>) => replaceFn(item, newSibling, visible, setVisible),
      getHiddenSiblings: () => getHiddenSiblingsFn(item, visible),
      getVisibleSiblings: () => getVisibleSiblingsFn(item, visible),
      remove: () => removeFn(item, visible, setVisible)
    }

    disableEnumerables(enrichedItem)

    return enrichedItem
  })
}

export function useDrilldown<T> (
  data: ListItem<T>[],
  parentKeyAccessor: ParentKeyAccessor<T>
): DrilldownItem<T>[] {
  const [list, setList] = useState<TreeItem<T>[]>(makeParentChildTree<T>(data, parentKeyAccessor))
  const [visible, setVisible] = useState<string[]>(list.filter(item => item.level === 1).map(item => item.key))

  useEffect(() => {
    const treeList: TreeItem<T>[] = makeParentChildTree<T>(data, parentKeyAccessor)
    setList(treeList)
  }, [data])

  return useMemo(() => {
    return getAndEnrichVisibleItems<T>(list, visible, setVisible)
  }, [list, visible])
}

import { useMemo, useState, useEffect, Dispatch } from 'react'
import { TreeItem, CHILDREN, PARENT, ParentKeyAccessor, makeParentChildTree } from '../utils/makeParentChildTree'
import { disableEnumerable } from '../utils/disableEnumerable'
import { ListItem } from '../utils'
import { drilldownFn, swapSiblingFn, getHiddenSiblingsFn, removeFn, getVisibleSiblingsFn } from './helpers'

export interface Children<T> {
  visibleChildren: TreeItem<T>[]
  hiddenChildren: TreeItem<T>[]
}

export type DrilldownItem<T> = T & TreeItem<T> & Children<T> & {
  drilldown: () => void
  swapSibling: (newSibling: DrilldownItem<T>) => void
  getHiddenSiblings: () => TreeItem<T>[]
  getVisibleSiblings: () => TreeItem<T>[]
  remove: () => void
}

export function enrichTreeItems<T> (list: TreeItem<T>[], visible: string[], setVisible: Dispatch<string[]>): DrilldownItem<T>[] {
  return list.map((item: TreeItem<T>): DrilldownItem<T> => {

    const children = (item[CHILDREN] || []).reduce((acc, child) => {
      if (visible.includes(child.key)) acc.visibleChildren.push(child)
      else acc.hiddenChildren.push(child)

      return acc
    }, { visibleChildren: [], hiddenChildren: [] } as Children<T>)

    return {
      ...item as TreeItem<T> & { level: number },
      ...children,
      drilldown: () => drilldownFn(item, children, visible, setVisible),
      swapSibling: (newSibling: TreeItem<T>) => swapSiblingFn(item, newSibling, visible, setVisible),
      getHiddenSiblings: () => getHiddenSiblingsFn(item, visible),
      getVisibleSiblings: () => getVisibleSiblingsFn(item, visible),
      remove: () => removeFn(item, visible, setVisible)
    }
  })
}

export function getVisibleItems<T> (list: DrilldownItem<T>[], visible: string[]): DrilldownItem<T>[] {
  return list.filter((item) => visible.includes(item.key)).map((item) => {
    if (item[PARENT]) disableEnumerable(item, PARENT)
    if (item[CHILDREN]) disableEnumerable(item, CHILDREN)
    disableEnumerable(item, 'visibleChildren')
    disableEnumerable(item, 'hiddenChildren')
    disableEnumerable(item, 'drilldown')
    disableEnumerable(item, 'swapSibling')
    disableEnumerable(item, 'getHiddenSiblings')
    disableEnumerable(item, 'getVisibleSiblings')
    disableEnumerable(item, 'remove')
    disableEnumerable(item, 'level')

    return item
  })
}

export function useDrilldown<T> (
  data: ListItem<T>[],
  parentKeyAccessor: ParentKeyAccessor<T>,
  visibleKeys: string[]
): DrilldownItem<T>[] {
  const [list, setList] = useState<TreeItem<T>[]>(makeParentChildTree<T>(data, parentKeyAccessor))
  const [visible, setVisible] = useState<string[]>(visibleKeys)

  useEffect(() => {
    setVisible(visibleKeys)
  }, [visibleKeys])

  useEffect(() => {
    const treeList: TreeItem<T>[] = makeParentChildTree<T>(data, parentKeyAccessor)
    setList(treeList)
  }, [data])

  return useMemo(() => {
    const enriched = enrichTreeItems(list, visible, setVisible)

    return getVisibleItems<T>(enriched, visible)
  }, [list, visible])
}

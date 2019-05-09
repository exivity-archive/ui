import { useMemo, useState, useEffect, Dispatch } from 'react'
import { drilldownFn, replaceFn, getHiddenSiblingsFn, getVisibleSiblingsFn, removeFn, disableEnumerables } from './helpers'
import { TreeItem, CHILDREN, ParentKeyAccessor, makeParentChildTree } from '../utils/makeParentChildTree'
import { ListItem } from '../utils'

export interface Children<T> {
  visibleChildren: TreeItem<T>[]
  hiddenChildren: TreeItem<T>[]
}

export type DrilldownItem<T> = T & TreeItem<T> & Children<T> & {
  drilldown: () => void
  replace: (newSibling: DrilldownItem<T>) => void
  getHiddenSiblings: () => TreeItem<T>[]
  getVisibleSiblings: () => TreeItem<T>[]
  remove: () => void
}

export function enrichTreeItems<T> (list: TreeItem<T>[], visible: string[], setVisible: Dispatch<string[]>): DrilldownItem<T>[] {

  return visible.map((key: string): DrilldownItem<T> => {
    const item = list.find(item => item.key === key)!

    const children = (item[CHILDREN] || []).reduce((acc, child) => {
      if (visible.includes(child.key)) acc.visibleChildren.push(child)
      else acc.hiddenChildren.push(child)

      return acc
    }, { visibleChildren: [], hiddenChildren: [] } as Children<T>)

    const drilldownItem = {
      ...item,
      ...children,
      drilldown: () => drilldownFn(item, children.hiddenChildren[0], visible, setVisible),
      replace: (newSibling: TreeItem<T>) => replaceFn(item, newSibling, visible, setVisible),
      getHiddenSiblings: () => getHiddenSiblingsFn(item, visible),
      getVisibleSiblings: () => getVisibleSiblingsFn(item, visible),
      remove: () => removeFn(item, visible, setVisible)
    }

    disableEnumerables(drilldownItem)

    return drilldownItem
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
    return enrichTreeItems<T>(list, visible, setVisible)
  }, [list, visible])
}

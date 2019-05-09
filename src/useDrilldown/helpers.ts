import { Dispatch } from 'react'
import { TreeItem, PARENT, iterateAllChildren, CHILDREN } from '../utils/makeParentChildTree'
import { DrilldownItem } from './useDrilldown'
import { disableEnumerable } from '../utils/disableEnumerable'

export function drilldownFn<T> (item: TreeItem<T>, childToAdd: TreeItem<T> | undefined, visible: string[], setVisible: Dispatch<string[]>) {
  if (childToAdd) {
    if (childToAdd[PARENT] !== item) throw new Error('Item is not parent of childToAdd')
    const itemIndex = visible.findIndex(key => key === item.key)
    if (itemIndex === -1) {
      throw new Error(
        `Item isn't visible. It's likely that the 'drilldown' method was called on an out of date item`
      )
    }

    const visibleCopy = [...visible]
    visibleCopy.splice(itemIndex + 1, 0, childToAdd.key)

    setVisible(visibleCopy)
  }
}

export function replaceFn<T> (item: TreeItem<T>, newItem: TreeItem<T>, visible: string[], setVisible: Dispatch<string[]>) {
  const itemIndex = visible.findIndex(key => key === item.key)
  if (itemIndex === -1) {
    throw new Error(
      `Item isn't visible. It's likely that the 'replace' method was called on an out of date item`
    )
  }

  const visibleCopy = removeChildren(item, visible)
  visibleCopy[itemIndex] = newItem.key

  setVisible(visibleCopy)
}

export function removeFn<T> (item: TreeItem<T>, visible: string[], setVisible: Dispatch<string[]>) {
  const itemIndex = visible.findIndex(key => key === item.key)
  if (itemIndex === -1) {
    throw new Error(
      `Item isn't visible. It's likely that the 'remove' method was called on an out of date item`
    )
  }

  const visibleCopy = removeChildren(item, visible)
  visibleCopy.splice(itemIndex, 1)

  setVisible(visibleCopy)
}

export function removeChildren<T> (item: TreeItem<T>, visible: string[]) {
  const copy = [...visible]
  iterateAllChildren(item, (child) => {
    const childIndex = copy.findIndex(key => key === child.key)
    if (childIndex !== -1) copy.splice(childIndex, 1)
  })
  return copy
}

export function getHiddenSiblingsFn<T> (item: TreeItem<T>, visible: string[]) {
  if (item[PARENT] && item[PARENT]![CHILDREN]) {
    return item[PARENT]![CHILDREN]!.filter((child) => !visible.includes(child.key))
  } else return []
}

export function getVisibleSiblingsFn<T> (item: TreeItem<T>, visible: string[]) {
  if (item[PARENT] && item[PARENT]![CHILDREN]) {
    return item[PARENT]![CHILDREN]!.filter((child) => visible.includes(child.key))
  } else return []
}

export function disableEnumerables<T> (item: DrilldownItem<T>) {
  if (item[PARENT]) disableEnumerable(item, PARENT)
  if (item[CHILDREN]) disableEnumerable(item, CHILDREN)
  disableEnumerable(item, 'visibleChildren')
  disableEnumerable(item, 'hiddenChildren')
  disableEnumerable(item, 'drilldown')
  disableEnumerable(item, 'replace')
  disableEnumerable(item, 'remove')
  disableEnumerable(item, 'getHiddenSiblings')
  disableEnumerable(item, 'getVisibleSiblings')
  disableEnumerable(item, 'level')
}

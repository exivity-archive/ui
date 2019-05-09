import { Dispatch } from 'react'
import { TreeItem, PARENT, iterateAllChildren, CHILDREN } from '../utils/makeParentChildTree'
import { DrilldownItem } from './useDrilldown'
import { disableEnumerable } from '../utils/disableEnumerable'

export function drilldownFn<T> (item: TreeItem<T>, childToAdd: TreeItem<T> | undefined, visible: string[], setVisible: Dispatch<string[]>) {
  if (childToAdd) {
    if (childToAdd[PARENT] === item) {
      const itemIndex = visible.findIndex(key => key === item.key)
      validateOperation(itemIndex, 'drilldown')

      const visibleCopy = [...visible]
      visibleCopy.splice(itemIndex + 1, 0, childToAdd.key)

      setVisible(visibleCopy)
    } else throw new Error('Item is not parent of childToAdd')
  }
}

export function replaceFn<T> (item: TreeItem<T>, newItem: TreeItem<T>, visible: string[], setVisible: Dispatch<string[]>) {
  const itemIndex = visible.findIndex(key => key === item.key)
  validateOperation(itemIndex, 'replace')

  const visibleCopy = [...visible]
  removeChildren(item, visibleCopy)
  visibleCopy[itemIndex] = newItem.key

  setVisible(visibleCopy)
}

export function removeFn<T> (item: TreeItem<T>, visible: string[], setVisible: Dispatch<string[]>) {
  const itemIndex = visible.findIndex(key => key === item.key)
  validateOperation(itemIndex, 'remove')

  const visibleCopy = [...visible]
  removeChildren(item, visibleCopy)
  visibleCopy.splice(itemIndex, 1)

  setVisible(visibleCopy)
}

type Operation = 'drilldown' | 'replace' | 'remove'

function validateOperation (index: number, operation: Operation) {
  if (index === -1) {
    throw new Error(
      `Item isn't visible. It's likely that the '${operation}' method was called on an out of date item`
    )
  }
}

export function removeChildren<T> (item: TreeItem<T>, visible: string[]) {
  iterateAllChildren(item, (child) => {
    const childIndex = visible.findIndex(key => key === child.key)
    if (childIndex !== -1) visible.splice(childIndex, 1)
  })
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

export interface Children<T> {
  visibleChildren: TreeItem<T>[]
  hiddenChildren: TreeItem<T>[]
}

export function separateVisibleAndHiddenChildren<T> (children: TreeItem<T>[], visible: string[]) {
  return children.reduce((acc, child) => {
    if (visible.includes(child.key)) acc.visibleChildren.push(child)
    else acc.hiddenChildren.push(child)

    return acc
  }, { visibleChildren: [], hiddenChildren: [] } as Children<T>)
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

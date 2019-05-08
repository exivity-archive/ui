import { Dispatch } from 'react'
import { TreeItem, PARENT, iterateAllChildren, CHILDREN } from '../utils/makeParentChildTree'
import { Children } from './useDrilldown'

export function drilldownFn<T> (item: TreeItem<T>, children: Children<T>, visible: string[], setVisible: Dispatch<string[]>) {
  const childToAdd = children.hiddenChildren.shift()

  if (childToAdd) {
    const itemIndexInVisible = visible.findIndex(key => key === item.key)
    const newVisible = [...visible]

    newVisible.splice(itemIndexInVisible, 0, childToAdd.key)
    setVisible(newVisible)
  }
}

export function swapSiblingFn<T> (item: TreeItem<T>, newSibling: TreeItem<T>, visible: string[], setVisible: Dispatch<string[]>) {
  if (item[PARENT] && newSibling[PARENT] !== newSibling[PARENT]) throw Error('Not siblings')

  const itemIndex = visible.findIndex(key => key === item.key)
  const newVisible = [...visible]

  newVisible.splice(itemIndex, 1, newSibling.key)
  iterateAllChildren(item, (child) => {
    const childIndex = newVisible.findIndex(key => key === child.key)
    if (childIndex !== -1) newVisible.splice(childIndex, 1)
  })
  setVisible(newVisible)
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

export function removeFn<T> (item: TreeItem<T>, visible: string[], setVisible: Dispatch<string[]>) {
  const itemIndex = visible.findIndex(key => key === item.key)
  const newVisible = [...visible]

  newVisible.splice(itemIndex, 1)
  iterateAllChildren(item, (child) => {
    const childIndex = newVisible.findIndex(key => key === child.key)
    if (childIndex !== -1) newVisible.splice(childIndex, 1)
  })
  setVisible(newVisible)
}

import { ListItem } from '../utils'

export const PARENT = 'expandable-list-parent'
export const CHILDREN = 'expandable-list-children'

export interface TreeItem extends ListItem {
  [PARENT]?: TreeItem
  [CHILDREN]?: TreeItem[]
}

export function iterateAllParents (item: TreeItem, callback: Function) {
  const parent = item[PARENT]
  if (parent) {
    callback(parent)
    iterateAllParents(parent, callback)
  }
}

export function iterateAllChildren (item: TreeItem, callback: Function) {
  const children = item[CHILDREN]
  if (children) {
    children.map((child) => {
      callback(child)
      return iterateAllChildren(child, callback)
    })
  }
}

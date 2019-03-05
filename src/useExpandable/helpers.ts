import { MapItem } from '../utils'

export const PARENT = 'expandable-list-parent'
export const CHILDREN = 'expandable-list-children'

export interface IterateItem extends MapItem {
  [PARENT]?: IterateItem
  [CHILDREN]?: IterateItem[]
}

export function iterateAllParents (item: IterateItem, callback: Function) {
  const parent = item[PARENT]
  if (parent) {
    callback(parent)
    iterateAllParents(parent, callback)
  }
}

export function iterateAllChildren (item: IterateItem, callback: Function) {
  const children = item[CHILDREN]
  if (children) {
    children.map((child) => {
      callback(child)
      return iterateAllChildren(child, callback)
    })
  }
}

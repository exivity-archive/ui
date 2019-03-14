import { ListItem } from '../utils'

export const PARENT = 'parent'
export const CHILDREN = 'children'

export type TreeItem<T> = ListItem<T> & {
  [PARENT]?: TreeItem<T>
  [CHILDREN]?: TreeItem<T>[]
}

export type TreeListItem<T> = TreeItem<T> & {
  expand (): void
}

export function iterateAllParents<T> (item: TreeItem<T>, callback: Function): void {
  const parent = item[PARENT]
  if (parent) {
    callback(parent)
    iterateAllParents(parent, callback)
  }
}

export function iterateAllChildren<T> (item: TreeItem<T>, callback: Function): void {
  const children = item[CHILDREN]
  if (children) {
    children.forEach((child) => {
      callback(child)
      iterateAllChildren(child, callback)
    })
  }
}

export function hasNoCollapsedParents<T> (item: TreeItem<T>, expanded: string[]): boolean {
  let parentsAreNotCollapsed = true

  iterateAllParents<T>(item, (parent: TreeItem<T>) => {
    if (!expanded.includes(parent.key)) {
      parentsAreNotCollapsed = false
    }
  })

  return parentsAreNotCollapsed
}

export function expandOrCollapseItem (key: string, expanded: string[], setExpanded: Function): void {
  if (expanded.includes(key)) {
    setExpanded(expanded.filter(item => item !== key))
  } else {
    setExpanded(expanded.concat([key]))
  }
}

function expandFn (keys: string[], expanded: string[], setExpanded: Function): void {
  const keysToAdd = keys.filter((key: string) => !expanded.includes(key))
  if (keysToAdd.length) {
    setExpanded(expanded.concat(keys))
  }
}

function collapseFn (keys: string[], expanded: string[], setExpanded: Function): void {
  const shouldFilter = keys.some(key => expanded.includes(key))
  if (shouldFilter) {
    setExpanded(expanded.filter((key) => !keys.includes(key)))
  }
}

export function expandOrCollapseItemTree<T> (
  expanded: string[],
  setExpanded: Function
): Function {
  return (
    fn: typeof iterateAllParents | typeof iterateAllChildren,
    expand: boolean = false
  ): Function => (
    item: TreeListItem <T>)
    : void => {
    const keys: string[] = [item.key]

    fn(item, (relatedItem: any) => {
      keys.push(relatedItem.key)
    })

    expand
      ? expandFn(keys, expanded, setExpanded)
      : collapseFn(keys, expanded, setExpanded)
  }
}

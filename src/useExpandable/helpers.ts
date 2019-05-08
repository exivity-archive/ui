import { TreeItem, iterateAllParents, iterateAllChildren } from '../utils/makeParentChildTree'

export type TreeListItem<T> = TreeItem<T> & {
  expanded: boolean
  expand (): void
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
    collapseFn([key], expanded, setExpanded)
  } else {
    expandFn([key], expanded, setExpanded)
  }
}

export function expandFn (keys: string[], expanded: string[], setExpanded: Function): void {
  const keysToAdd = keys.filter((key: string) => !expanded.includes(key))

  if (keysToAdd.length) {
    setExpanded(expanded.concat(keysToAdd))
  }
}

export function collapseFn (keys: string[], expanded: string[], setExpanded: Function): void {
  const shouldFilter = keys.some(key => expanded.includes(key))
  if (shouldFilter) {
    setExpanded(expanded.filter((key) => !keys.includes(key)))
  }
}

export type Helpers<T> = {
  expand: {
    parents: ExpandOrCollapseTree<T>
    children: ExpandOrCollapseTree<T>
  },
  collapse: {
    parents: ExpandOrCollapseTree<T>
    children: ExpandOrCollapseTree<T>
  }
}

export function createExpandOrCollapseTreeHelpers<T> (expanded: string[], setExpanded: Function): Helpers<T> {
  const expandOrcollapseTree = expandOrCollapseItemTree<T>(expanded, setExpanded)

  const expand = {
    parents: expandOrcollapseTree(iterateAllParents, true),
    children: expandOrcollapseTree(iterateAllChildren, true)
  }

  const collapse = {
    parents: expandOrcollapseTree(iterateAllParents),
    children: expandOrcollapseTree(iterateAllChildren)
  }

  return { expand, collapse }
}

export type ExpandOrCollapseChildrenOrParents<T> = (
  fn: typeof iterateAllParents | typeof iterateAllChildren,
  expand?: boolean
) => ExpandOrCollapseTree<T>

export type ExpandOrCollapseTree<T> = (item: TreeListItem<T>) => void

export function expandOrCollapseItemTree<T> (
  expanded: string[],
  setExpanded: Function
): ExpandOrCollapseChildrenOrParents<T> {
  return (
    fn,
    expand = false
  ): ExpandOrCollapseTree<T> => (item) => {
    const keys: string[] = [item.key]

    fn(item, (relatedItem) => {
      keys.push(relatedItem.key)
    })

    expand
      ? expandFn(keys, expanded, setExpanded)
      : collapseFn(keys, expanded, setExpanded)
  }
}

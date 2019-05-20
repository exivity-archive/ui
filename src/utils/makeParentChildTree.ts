import { KeyedItem, Map, createMap } from '.'

export const PARENT = 'parent'
export const CHILDREN = 'children'

export type TreeItem<T> = KeyedItem<T> & {
  [PARENT]?: TreeItem<T>
  [CHILDREN]?: TreeItem<T>[]
  level: number
}

export type ParentKeyAccessor<T> = (mapItem: TreeItem<T>) => string | null

export function createParentChildrenMap<T> (
  data: KeyedItem<T>[],
  parentKeyAccessor: ParentKeyAccessor<T>
): Map<TreeItem<T>> {
  const map = createMap<T>(data)

  data.forEach((item) => {
    const mapItem = map[item.key] as TreeItem<T>
    const parentKey = parentKeyAccessor(mapItem)
    const parent = parentKey && map[parentKey] as TreeItem<T>

    if (parent) {
      mapItem[PARENT] = parent
      const parentChildren = parent[CHILDREN]

      if (!parentChildren) {
        parent[CHILDREN] = [mapItem]
      } else if (!parentChildren.includes(mapItem)) {
        parentChildren.push(mapItem)
      }
    }
  })

  // @ts-ignore
  return map
}

export function orderChildrenUnderParents<T> (map: Map<TreeItem<T>>): TreeItem<T>[] {
  return Object
    .values(map)
    .reduce((list: TreeItem<T>[], item: TreeItem<T>): TreeItem<T>[] => {
      if (!item[PARENT]) {
        item.level = 1
        const addToList: TreeItem<T>[] = [item]

        iterateAllChildren(item, (child) => {
          child.level = child[PARENT]!.level + 1
          addToList.push(child)
        })

        return list.concat(addToList)
      }
      return list
    }, [])
}

export function makeParentChildTree<T> (data: KeyedItem<T>[], parentKeyAccessor: ParentKeyAccessor<T>): TreeItem<T>[] {
  const parentChildrenMap: Map<TreeItem<T>> = createParentChildrenMap<T>(data, parentKeyAccessor)
  return orderChildrenUnderParents<T>(parentChildrenMap)
}

export function iterateAllParents<T> (item: TreeItem<T>, callback: (child: TreeItem<T>) => void): void {
  const parent = item[PARENT]
  if (parent) {
    callback(parent)
    iterateAllParents(parent, callback)
  }
}

export function iterateAllChildren<T> (item: TreeItem<T>, callback: (child: TreeItem<T>) => void): void {
  const children = item[CHILDREN]
  if (children) {
    children.forEach((child) => {
      callback(child)
      iterateAllChildren(child, callback)
    })
  }
}

export function sortAllChildren<T> (item: TreeItem<T>, sortCallback: (a: TreeItem<T>, b: TreeItem<T>) => number) {
  const children = item[CHILDREN]
  if (children) {
    children.sort(sortCallback).forEach(child => sortAllChildren(child, sortCallback))
  }
}

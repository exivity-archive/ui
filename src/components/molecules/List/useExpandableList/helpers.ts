import { MapItem } from '../helpers'

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

export const areEqual = (newArgs: any, oldArgs: any) => {
    const newData = newArgs[0]
    const oldData = oldArgs[0]
    const newExpanded = newArgs[2]
    const oldExpanded = oldArgs[2]

    if (newData !== oldData || newExpanded !== oldExpanded) {
        return false
    }

    return true
}

import React, { useState } from 'react'
import memoize from 'memoize-one'

function createMap (data: any) {
    const map: any = {}

    data.forEach((item: { key: string|number }) => {
        map[item.key] = item
    })

    return map
}

export function iterateAllParents (item: any, callback: any) {
    if (item.parent) {
        callback(item.parent)
        iterateAllParents(item.parent, callback)
    }
}

export function iterateAllChildren (item: any, callback: any) {
    if (item.children) {
        item.children.map((child: any) => {
            callback(child)
            return iterateAllChildren(child, callback)
        })
    }
}

const createDataStructure = memoize((data: any, expanded: boolean) => {
    const map = createMap(data)

    data.forEach((item: any) => {
        const mapItem = map[item.key]

        if (mapItem.parent) {
            mapItem.parent = map[mapItem.parent]
            if (mapItem.parent !== undefined) {
                const parent = typeof mapItem.parent === 'number' ? mapItem.parent : mapItem.parent.key
                map[parent].children.push(mapItem)
            }
        }
    })

    return Object.values(map).reduce((arr: any, next: any, index: number) => {
        if (!next.parent) {
            const addToArray = [next]
            next.expanded = expanded
            next.originalIndex = arr.length

            iterateAllChildren(next, (child: any) => {
                child.expanded = expanded
                child.originalIndex = arr.length + addToArray.length
                child.parentIndex = arr.length
                addToArray.push(child)
            })

            return arr.concat(addToArray)
        }
        return arr
    }, [])
})

const noCollapsedParents = (item: any, data: any) => {
    let parentsNotCollapsed = true
    iterateAllParents(item, (parent: any) => {
        if (!data[parent.originalIndex].expanded) {
            parentsNotCollapsed = false
        }
    })
    return parentsNotCollapsed
}

function getVisibleItems (data: any) {
    return data.filter((item: any) => {
        const noParentsCollapsed = noCollapsedParents(item, data)
        const noParent = !item.parent
        return noParent || noParentsCollapsed
    })
}

function enrichItems (data: any, originalData: any, setStatus: any) {
    return data.map((item: any) => ({
        ...item,
        onClick: function () {
            const originalItem = originalData[item.originalIndex]
            originalItem.expanded = !originalItem.expanded
            setStatus([...originalData])
            item.onClick && item.onClick()
        }
    }))
}

export function useExpandableList (data: any, expanded: boolean = false) {
    const treeData: any = createDataStructure(data, expanded)
    const [storedData, setStatus] = useState(treeData)

    const visibleItems = getVisibleItems(storedData)
    const enrichedItems = enrichItems(visibleItems, storedData, setStatus)

    return {
        itemData: enrichedItems,
        itemCount: visibleItems.length
    }
}
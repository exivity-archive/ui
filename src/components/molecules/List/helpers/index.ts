export interface MapItem {
    key: string
}

type MapData<T> = T[]

export interface Map<T> {
    [index: string]: T
}

export function createMap<T extends MapItem> (data: MapData<T>): Map<T> {
    const map: Map<T> = {}

    data.forEach((item) => {
        map[item.key] = item
    })

    return map
}
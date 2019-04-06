import { ListItem } from '../utils'

export interface Map<Type> {
  [key: string]: Type
}

export function makeMap<
  Item extends {},
  Type
> (data: ListItem<Item>[], initialValueCallback: ((item: ListItem<Item>) => Type) | Type, oldMap: Map<Type> = {}) {
  return data.reduce((map, item) => {
    // @ts-ignore
    const initialValue = typeof initialValueCallback === 'function' ? initialValueCallback(item) : initialValueCallback
    map[item.key] = map[item.key] !== undefined ? map[item.key] : initialValue
    return map
  }, { ...oldMap })
}

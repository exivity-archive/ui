import { ListItem } from '../utils'
import { disableEnumerable } from '../utils/disableEnumerable'

export interface Map<Type> {
  [key: string]: Type
}

export function makeMap<
  Item extends {},
  Type
> (data: ListItem<Item>[], oldMap: Map<Type>, initialValueCallback: ((item: ListItem<Item>) => Type) | Type) {
  return data.reduce((map, item) => {
    // @ts-ignore
    const initialValue = typeof initialValueCallback === 'function' ? initialValueCallback(item) : initialValueCallback
    map[item.key] = map[item.key] !== undefined ? map[item.key] : initialValue
    return map
  }, oldMap)
}

type Enriched<Type, Attribute extends string, Setter extends string> =
  Record<Attribute, Type> & Record<Setter, (newValue: Type) => void>

export function enrichData<
  Type,
  Attribute extends string,
  Setter extends string,
  Item extends {},
  > (
    data: ListItem<Item>[],
    attribute: Attribute,
    setter: Setter,
    map: Map<Type>,
    setMap: (newMap: Map<Type>) => void
  ) {
  data.forEach(item => {
    // @ts-ignore
    item[attribute] = map[item.key]
    // @ts-ignore
    item[setter] = (newValue: Type) => {
      setMap({ ...map, [item.key]: newValue })
    }

    disableEnumerable(item, setter)
  })

  return data as ListItem<Item & Enriched<Type, Attribute, Setter>>[]
}

import { useState, useEffect, useMemo } from 'react'
import { ListItem } from '../utils'
import { Map, makeMap } from './helpers'
import { disableEnumerable } from '../utils/disableEnumerable'

export type Enriched<Type, Attribute extends string, Setter extends string> =
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

export function useDynamicAttribute<
  Item extends {},
  Attribute extends string,
  Setter extends string,
  Type,
  > (
    data: ListItem<Item>[],
    attribute: Attribute,
    setter: Setter,
    initialValueCallback: Type | ((item: ListItem<Item>) => Type)
  ) {
  const [map, setMap] = useState<Map<Type>>(makeMap(data, initialValueCallback))

  useEffect(() => {
    setMap(makeMap(data, initialValueCallback, map))
  }, [data])

  return useMemo(() => {
    return enrichData(data, attribute, setter, map, setMap)
  }, [map])
}

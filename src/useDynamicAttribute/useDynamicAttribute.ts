import { useState, useEffect, useMemo } from 'react'
import { ListItem } from '../utils'
import { Map, makeMap, enrichData } from './helpers'

export function useDynamicAttribute<
  Item extends {},
  Attribute extends string,
  Setter extends string,
  Type,
  > (
    data: ListItem<Item>[],
    attribute: Attribute,
    setter: Setter,
    initialValueCallback: ((item: ListItem<Item>) => Type) | Type
  ) {
  const [map, setMap] = useState<Map<Type>>({})

  useEffect(() => {
    setMap(makeMap(data, map, initialValueCallback))
  }, [data])

  return useMemo(() => {
    return enrichData(data, attribute, setter, map, setMap)
  }, [map])
}

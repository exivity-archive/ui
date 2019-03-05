import React, { useState } from 'react'
import { MapItem } from '../utils'
import { Enrichment } from './types'

export function useDynamicAttribute<
  T extends MapItem,
  TKey extends string,
  TSet extends string,
  TValue
> (data: T[], key: TKey, set: TSet, initVal: (((item: T) => TValue)) | TValue): (T & Enrichment<T, TKey, TSet, TValue>)[] {
  type Data = T & Enrichment<T, TKey, TSet, TValue>

  function getInitialState (item: T) {
    if (typeof initVal !== 'function') {
      return initVal
    }
    return (initVal as ((item: T) => TValue))(item)
  }

  const items = data.map((dataItem, i) => {

    function setAttribute (newValue: TValue) {
      flatListItems[i] = { ...dataItem, [key]: newValue, [set]: setAttribute } as Data
      const newData = flatListItems.map((item) => ({ ...item }))
      setFlatlistItems(newData)
    }

    return { ...dataItem, [key]: getInitialState(dataItem), [set]: setAttribute } as Data
  })

  const [flatListItems, setFlatlistItems] = useState<Data[]>(items)

  return flatListItems
}

import React, { useState, useEffect, useMemo } from 'react'
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

  const [flatListItems, setFlatListItems] = useState<Data[]>([])

  function mapItems (data: T[]) {
    return data.map((dataItem, i) => {
      return { ...dataItem, [key]: getInitialState(dataItem) } as Data
    })
  }

  function makeSetAttribute (item: T, i: number) {
    return (value: TValue) => {
      flatListItems[i] = { ...item, [key]: value, [set]: makeSetAttribute(item, i) } as Data
      console.log(flatListItems)
      const newData = flatListItems.map((item) => ({ ...item }))
      setFlatListItems(newData)
    }
  }

  function addSetter (data: Data[]) {
    return data.map((item, i) => {
      return { ...item, [set]: makeSetAttribute(item, i) }
    })
  }

  const newItems = mapItems(data)
  useEffect(() => {
    if (flatListItems.length) {
      setFlatListItems(addSetter(newItems))
    } else {
      setFlatListItems(newItems)
    }
  }, [newItems])

  return flatListItems
}

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

  const [flatListItems, setFlatListItems] = useState<Data[]>([])

  function getInitialState (item: T) {
    if (typeof initVal !== 'function') {
      return initVal
    }
    return (initVal as ((item: T) => TValue))(item)
  }

  function makeSetAttribute (item: T, i: number) {
    return (value: TValue) => {
      const newData = [...flatListItems]
      newData[i] = { ...item, [key]: value, [set]: makeSetAttribute(item, i) } as Data
      setFlatListItems(newData)
    }
  }

  function enhance (data: Data[]) {
    data.forEach((item, i) => {
      if (i === 0) {
        console.log('enhance', item)
      }
      item[key] = getInitialState(item) as any
      item[set] = makeSetAttribute(item, i) as any
    })
    return data
  }

  useEffect(() => {
    console.log('data', data[0])
    setFlatListItems(data as any)
  }, [data])

  return useMemo(() => {
    console.log('map')
    return enhance(flatListItems)
  }, [flatListItems])
}

import React, { useState } from 'react'

type Enrichment<T, TKey extends string, TSet extends string, TValue> =
  & Record<TKey, TValue>
  & Record<TSet, (value: TValue, data: (T & Enrichment<T, TKey, TSet, TValue>)[]) => void>

export type Enriched<T, TKey extends string, TSet extends string, TValue> = T & Enrichment<T, TKey, TSet, TValue>

export function useDynamicAttribute<
  T extends {},
  TKey extends string,
  TSet extends string,
  TValue
> (items: T[], key: TKey, set: TSet, initVal: (((item: T) => TValue)) | TValue): (T & Enrichment<T, TKey, TSet, TValue>)[] {
  type Data = (T & Enrichment<T, TKey, TSet, TValue>)

  function getInitialState (item: T) {
    if (typeof initVal !== 'function') {
      return initVal
    }
    return (initVal as ((item: T) => TValue))(item)
  }

  const [data, setData] = useState(items = items.map((dataItem, i) => {
    const setAttribute = (newValue: TValue, data: Data[]) => {
      const newData = [...data]
      const newItem = { ...dataItem, [key]: newValue, [set]: setAttribute }
      newData[i] = newItem as Data
      setData(newData)
    }
    const enrichment = { [key]: getInitialState(dataItem), [set]: setAttribute }
    return {
      ...dataItem,
      ...enrichment
    }
  }))
  return data as (T & Enrichment<T, TKey, TSet, TValue>)[]
}

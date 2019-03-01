import React, { useState } from 'react'

type InitCallback<T, TValue> = ((item: T) => TValue)
type Set<TValue> = (value: TValue) => void
type Enriched<TKey extends string, TSet extends string, TValue> = Record<TKey, TValue> & Record<TSet, Set<TValue>>

function addDynamicAttribute<
  T extends {},
  TKey extends string,
  TSet extends string,
  TValue
> (items: T[], key: TKey, set: TSet, initVal: InitCallback<T, TValue> | TValue): (T & Enriched<TKey, TSet, TValue>)[] {

  function getInitialState (item: T) {
    if (typeof initVal !== 'function') {
      return initVal
    }
    return (initVal as InitCallback<T, TValue>)(item)
  }

  const [data, setData] = useState(items = items.map((dataItem, i) => {
    const setAttribute = (newValue: TValue) => {
      const newData = [...data]
      const newItem = { ...dataItem, [key]: newValue, [set]: setAttribute }
      newData[i] = newItem as T & Enriched<TKey, TSet, TValue>
      setData(newData)
    }
    const enrichment = { [key]: getInitialState(dataItem), [set]: setAttribute }
    return {
      ...dataItem,
      ...(enrichment as Enriched<TKey, TSet, TValue>)
    }
  }))
  return data
}

export default addDynamicAttribute

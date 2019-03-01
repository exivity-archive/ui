import React, { useState } from 'react'

type InitCallback<T, TValue> = ((item: T) => TValue)
type Set<TValue> = (value: TValue) => void
type Enriched<TKey extends string, TSet extends string, TValue> = Record<TKey, TValue> & Record<TSet, Set<TValue>>

function useDynamicAttribute<
  T extends {},
  TKey extends string,
  TSet extends string,
  TValue
> (data: T[], key: TKey, set: TSet, initVal: InitCallback<T, TValue> | TValue): (T & Enriched<TKey, TSet, TValue>)[] {

  function getInitialState (item: T) {
    if (typeof initVal !== 'function') {
      return initVal
    }
    return (initVal as InitCallback<T, TValue>)(item)
  }

  return data.map(item => {
    const [value, setValue] = useState(getInitialState(item))
    const enrichment = { [key]: value, [set]: setValue } as Enriched<TKey, TSet, TValue>
    return {
      ...item,
      ...enrichment
    }
  })

}

export default useDynamicAttribute

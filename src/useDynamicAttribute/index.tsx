import React from 'react'

type Enriched<TKey extends string, TSet extends string, TValue> = Record<TKey, TValue> & Record<TSet, (value: TValue) => void>

function useDynamicAttribute<
  T extends {},
  TKey extends string,
  TSet extends string,
  TValue
> (data: T[], key: TKey, set: TSet, initVal: ((item: T) => TValue) | TValue): (T & Enriched<TKey, TSet, TValue>)[] {
  const data1: T = data[0]
  const data2 = { [key]: initVal, [set]: (value: TValue) => { return } } as Enriched<TKey, TSet, TValue>
  return [{
    ...data1,
    ...data2
  }]
}

export default useDynamicAttribute

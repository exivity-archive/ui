export type Enrichment<T, TKey extends string, TSet extends string, TValue> =
  & Record<TKey, TValue>
  & Record<TSet, (value: TValue, data: (T & Enrichment<T, TKey, TSet, TValue>)[]) => void>

export type Enriched<T, TKey extends string, TSet extends string, TValue> = T & Enrichment<T, TKey, TSet, TValue>

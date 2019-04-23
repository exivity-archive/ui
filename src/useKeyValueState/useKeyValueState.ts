import { useState, useMemo, Dispatch } from 'react'

export interface KeyValuePair<Key, Value> {
  key: Key
  value: Value
}

type KeyValueState<Key, Value> = [Value | undefined, Key, Dispatch<React.SetStateAction<Key | undefined>>]

export function useKeyValueState<Key extends string, Value> (
  data: KeyValuePair<Key, Value>[],
  initialKey: Key
) {
  const [key, setKey] = useState(initialKey)

  return useMemo(() => {
    const currentItem = data.find(item => item.key === key)
    return [currentItem && currentItem.value, key, setKey] as KeyValueState<Key, Value>
  }, [key, data])
}

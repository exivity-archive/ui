import { useState, useMemo, Dispatch } from 'react'

export interface KeyValuePair<Key, Value> {
  key: Key
  value: Value
}

type KeyValueState<Key, Value> = [Value | undefined, Dispatch<React.SetStateAction<Key | undefined>>, Key]

export function useKeyValueState<Key extends string, Value> (
  data: KeyValuePair<Key, Value>[],
  initialKey: Key
) {
  const [key, setKey] = useState(initialKey)

  return useMemo(() => {
    const currentItem = data.find(item => item.key === key)
    return [currentItem ? currentItem.value : undefined, setKey, key] as KeyValueState<Key, Value>
  }, [key, data])
}

import { useState } from 'react'

export function useObjectState<ObjectState extends {}> (initialState: ObjectState) {
  const [stateObject, setObjectState] = useState(initialState)

  function updateObjectState<Key extends keyof ObjectState> (key: Key, value: ObjectState[Key]) {
    setObjectState({ ...stateObject, [key]: value })
  }

  return [stateObject, updateObjectState, setObjectState] as [ObjectState, typeof updateObjectState, typeof setObjectState]
}

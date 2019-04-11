import { useState } from 'react'

export function useStateObject<StateObject extends {}> (initialState: StateObject) {
  const [stateObject, setStateObject] = useState(initialState)

  function updateStateObject<Key extends keyof StateObject> (key: Key, value: StateObject[Key]) {
    setStateObject({ ...stateObject, [key]: value })
  }

  return [stateObject, updateStateObject, setStateObject] as [StateObject, typeof updateStateObject, typeof setStateObject]
}

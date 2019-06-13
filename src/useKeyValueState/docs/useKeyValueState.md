# useKeyValueState

This hook allows for less verbose and more type safe item management

## Example

 `const [state, setKey] = useKeyValueState<Key, Value>(data, initialKey)`

## Parameters

  | name | type | Required | description |
  |-----------|------------|--------|--------|
  | `Key` | `type parameter: extends string` | `no` | Used to define the type of the keys.  | 
  | `Value` | `type parameter` | `no` | Used to define the type of the values  | 
  | `data` | `{ key: Key, value: Value }[]` | `yes` | The possible state values |
  | `initialKey` | `Key` | `yes` | Determines the initial value |

## Return value
  | name | type  description |
  |-----------|------------|--------|--------|
  | `state` | `{ key: Key, value: Value } | undefined` | Value of current state. Is undefined when no given item matches the key.  | 
  | `setKey` | `(newKey: Key) => void` | Updates the state to the item that matches the new key  | 
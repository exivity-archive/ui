# useStateObject

This hook allows for less verbose and more type safe object state management 

## Example

 `const [state, updateState, setState] = useStateObject<StateObject>(initialState)`

## Parameters

  | name | type | Required | description |
  |-----------|------------|--------|--------|
  | `StateObject` | `extends {}` | `no` | Used to define the shape of the object.  | 
  | `initialState` | `StateObject` | `yes` | Object to set as the initialState.  | 

## Return value
  | name | type  description |
  |-----------|------------|--------|--------|
  | `state` | `StateObject` | Current state.  | 
  | `updateState` | `(key: keyof StateObject, value: StateObject[key]) => void` | Update a single property.  | 
  | `setState` | `(newState: StateObject) => void` | Updates entire state  | 
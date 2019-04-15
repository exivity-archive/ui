# useObjectState

This hook allows for less verbose and more type safe object state management 

## Example

 `const [state, updateObjectState, setObjectState] = useObjectState<ObjectState>(initialState)`

## Parameters

  | name | type | Required | description |
  |-----------|------------|--------|--------|
  | `ObjectState` | `extends {}` | `no` | Used to define the shape of the object.  | 
  | `initialState` | `ObjectState` | `yes` | Object to set as the initialState.  | 

## Return value
  | name | type  description |
  |-----------|------------|--------|--------|
  | `state` | `ObjectState` | Current state.  | 
  | `updateState` | `(key: keyof ObjectState, value: ObjectState[key]) => void` | Update a single property.  | 
  | `setState` | `(newState: ObjectState) => void` | Updates entire state  | 
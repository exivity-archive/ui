# useIsUncontrolled

useIsUncontrolled is a hook that can be used to make a component optionally uncontrolled.

## Example

 `const [value, setValue] = useIsUncontrolled<T>(defaultValue, controlledValue, controlledSetValue)`

## Parameters

  | name | type |  description |
  |-----------|------------|--------|
  | `T` | `type parameter` | Determines what the type of the value and the parameter of the setters should be.  | 
  | `defaultValue` | `T` |  Used to initialize new state if `controlledValue` and `controlledSetValue` are not defined.  |
  | `controlledValue` | `T | undefined` | Gets returned as first array element if it and `controlledSetValue` are defined |
  | `controlledSetValue` | `(newValue: T) => void | undefined` | Gets returned as second array element if it and `controlledValue` are defined |
  | `onChange` | `(newValue: T) => void` | Gets called whenever setValue gets called |

## Behaviour
- If `controlledValue` and `controlledSetValue` are both defined they both get returned inside an array. 
- If `controlledValue` is defined and `controlledSetValue` is not defined it throws an error.
- If `controlledValue` and `controlledSetValue` are both undefined, a new value-setter pair gets returned inside an array with the value initialized to `defaultValue`.
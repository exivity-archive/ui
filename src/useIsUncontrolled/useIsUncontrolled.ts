import { useState } from 'react'

export function useIsUncontrolled<T> (
  defaultValue: T,
  controlledValue?: T,
  controlledSetValue?: (newValue: T) => void,
  onChange?: (value: T) => void
): [T, (newValue: T) => void] {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)

  if (controlledValue === undefined && controlledSetValue === undefined) {
    return [uncontrolledValue, withOnChange(setUncontrolledValue, onChange)]
  } else if (controlledValue !== undefined && controlledSetValue !== undefined) {
    return [controlledValue, withOnChange(controlledSetValue, onChange)]
  }
  throw new Error(
    'Either controlledValue or controlledSetValue is undefined while the other isn\'t. '
    + 'They should either both be defined or both be undefined.'
  )
}

function withOnChange<T> (setter: (newValue: T) => void, onChange?: (value: T) => void) {
  return (newValue: T) => {
    setter(newValue)
    onChange && onChange(newValue)
  }
}

import { useState } from 'react'

export function useIsUncontrolled<T> (
  defaultValue: T,
  controlledValue?: T,
  onChange?: (newValue: T) => void
): [T, (newValue: T) => void] {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)

  if (controlledValue === undefined) {
    return [uncontrolledValue, withOnChange(setUncontrolledValue, onChange)]
  } else {
    onChange = onChange ? onChange : () => { return }
    return [controlledValue, onChange]
  }
}

function withOnChange<T> (setter: (newValue: T) => void, onChange?: (value: T) => void) {
  return (newValue: T) => {
    setter(newValue)
    onChange && onChange(newValue)
  }
}

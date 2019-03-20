import { useState } from 'react'

export function useIsUncontrolled<T> (
  defaultValue: T,
  controlledValue?: T,
  controlledSetValue?: (newValue: T) => void
): [T, (newValue: T) => void] {
  const uncontrolledState = useState(defaultValue)

  const onlyControlledValueIsUndef = controlledValue !== undefined && controlledSetValue === undefined
  const onlyControlledSetValueIsUndef = controlledValue === undefined && controlledSetValue !== undefined
  const oneOfControlledIsUndef = onlyControlledValueIsUndef || onlyControlledSetValueIsUndef

  if (oneOfControlledIsUndef) {
    throw new Error(
      'Either controlledValue or controlledSetValue is undefined while the other isn\'t. '
      + 'They should either both be defined or both be undefined.'
    )
  } else if (controlledValue !== undefined && controlledSetValue !== undefined) {
    return [controlledValue, controlledSetValue]
  } else {
    return uncontrolledState
  }
}

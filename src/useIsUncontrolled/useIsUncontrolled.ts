import { useState } from 'react'

export function useIsUncontrolled<T> (
  defaultValue: T,
  controlledValue?: T,
  controlledSetValue?: (newValue: T) => void
): [T, (newValue: T) => void] {
  const uncontrolledState = useState(defaultValue)

  if (controlledValue === undefined && controlledSetValue === undefined) {
    return uncontrolledState
  } else if (controlledValue !== undefined && controlledSetValue !== undefined) {
    return [controlledValue, controlledSetValue]
  }
  throw new Error(
    'Either controlledValue or controlledSetValue is undefined while the other isn\'t. '
    + 'They should either both be defined or both be undefined.'
  )
}

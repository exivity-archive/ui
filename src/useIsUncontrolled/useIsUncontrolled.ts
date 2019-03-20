import { useState } from 'react'

export function useIsUncontrolled<T> (
  defaultValue: T,
  controlledValue?: T,
  controlledSetValue?: (newValue: T) => void
): [T, (newValue: T) => void] {
  const [uncontrolledValue, uncontrolledSetValue] = useState(defaultValue)

  if (controlledValue !== undefined && controlledSetValue === undefined) {
    throw new Error('If useIsUncontrolled takes in a defined controlledValue, the controlledSetValue should also be defined')
  } else if (controlledValue === undefined && controlledSetValue !== undefined) {
    throw new Error('If useIsUncontrolled takes in a defined controlledSetValue, the controlledValue should also be defined')
  }

  if (controlledValue !== undefined && controlledSetValue) {
    return [controlledValue, controlledSetValue]
  } else {
    return [uncontrolledValue, uncontrolledSetValue]
  }

}

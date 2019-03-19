import { useState } from 'react'

export function useIsUncontrolled<T> (
  defaultValue: T,
  controlledValue?: T,
  controlledSetter?: (newValue: T) => void
): [T, (newValue: T) => void] {
  const [uncontrolledValue, uncontrolledSetter] = useState(defaultValue)

  if (controlledValue !== undefined && !controlledSetter) {
    throw new Error('If useIsUncontrolled takes in a defined controlledValue, the controlledSetter should also be defined')
  }

  if (controlledValue !== undefined && controlledSetter) {
    return [controlledValue, controlledSetter]
  } else {
    return [uncontrolledValue, uncontrolledSetter]
  }

}

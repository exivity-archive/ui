import { useRef, useState, useLayoutEffect, RefObject } from 'react'
import { makeSpacing } from '../utils/makeCssSpacing'

interface Parameters<RefElement> {
  baseValue?: string | number
  refAccessor: (ref: RefObject<RefElement>) => string | number | undefined
}

export function useRefDependentSpacing<
  RefElement extends HTMLElement = HTMLElement
> ({ baseValue = 0, refAccessor }: Parameters<RefElement>) {
  const dependencyRef = useRef<RefElement>(null)
  const [value, setValue] = useState<string>()

  const refValue = refAccessor(dependencyRef)

  useLayoutEffect(() => {
    setValue(makeSpacing(baseValue, refValue))
  }, [refValue, baseValue])

  return [value, dependencyRef] as [string, RefObject<RefElement>]
}

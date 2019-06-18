import { useRef, useState, useLayoutEffect, RefObject } from 'react'
import { makeCSSCalcExpression } from '../utils/makeCSSCalcExpression'

interface Parameters<RefElement> {
  baseValue?: string | number
  nodeAccessor: (node: RefElement | null) => string | number | undefined
}

export function useRefDependentSpacing<
  RefElement extends HTMLElement = HTMLElement
> ({ baseValue = 0, nodeAccessor }: Parameters<RefElement>) {
  const dependencyRef = useRef<RefElement>(null)
  const [value, setValue] = useState<string>()

  const refValue = nodeAccessor(dependencyRef.current)

  useLayoutEffect(() => {
    setValue(makeCSSCalcExpression(baseValue, refValue))
  }, [refValue, baseValue])

  return [value, dependencyRef] as [string, RefObject<RefElement>]
}

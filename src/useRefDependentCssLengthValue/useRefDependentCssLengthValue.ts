import { useRef, useState, useLayoutEffect, RefObject } from 'react'
import { makeCssLengthExpression } from '../utils/makeCssLengthExpression'

export function useRefDependentCssLengthValue<
  RefElement extends HTMLElement = HTMLElement
> (baseValue: string | number, refAccessor: (ref: RefObject<RefElement>) => string | number | undefined) {
  const dependencyRef = useRef<RefElement>(null)
  const [value, setValue] = useState<string>()

  const refValue = refAccessor(dependencyRef)

  useLayoutEffect(() => {
    setValue(makeCssLengthExpression(baseValue, refValue))
  }, [refValue, baseValue])

  return [value, dependencyRef] as [string, RefObject<RefElement>]
}

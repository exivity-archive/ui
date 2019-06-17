import { useRef, useState, useLayoutEffect, RefObject } from 'react'
import { makeCssCalcExpression } from '../utils/makeCssCalcExpression'
import { tryGetRectProp } from '../utils/tryGetRectProp'

export function useDynamicCssLengthValue<
  RefElement extends HTMLElement = HTMLElement
> (baseValue: string | number, rectPropKey: keyof (ClientRect | DOMRect)) {
  const dependencyRef = useRef<RefElement>(null)
  const [value, setValue] = useState<string>()

  const rectValue = tryGetRectProp(dependencyRef, rectPropKey)

  useLayoutEffect(() => {
    setValue(makeCssCalcExpression(baseValue, rectValue))
  }, [rectValue, baseValue])

  return [value, dependencyRef] as [string, RefObject<RefElement>]
}

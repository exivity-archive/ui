import { ReactNode, useMemo, cloneElement, Children, ReactElement, FC, useRef, useLayoutEffect, useState, RefObject } from 'react'

import { makeCssCalcExpression, tryGetRectProp } from './helpers'
import { ExtraPadding, Position, ADORNMENT_DISPLAY_NAME, EXTRA_PADDING } from './Adornment'
import { isReactElement } from '../utils/isReactElement'

function cloneAndAddPadding (child: ReactElement<any, FC>, extraPadding: ExtraPadding) {
  const style = child.props['style'] || {}

  const paddingRight = makeCssCalcExpression(style.paddingRight, extraPadding[Position.RIGHT])
  const paddingLeft = makeCssCalcExpression(style.paddingLeft, extraPadding[Position.LEFT])

  return cloneElement(child, {
    style: { ...style, paddingLeft, paddingRight }
  })
}

function cloneChildWithPadding (children: ReactNode, extraPadding: ExtraPadding) {
  const child = Children.only(children)

  if (!isReactElement(child)) throw new Error(`Child of ${ADORNMENT_DISPLAY_NAME} is not a ReactElement`)

  if (child.type.displayName === ADORNMENT_DISPLAY_NAME) {
    return cloneElement(child, { [EXTRA_PADDING]: extraPadding })
  }

  return cloneAndAddPadding(child, extraPadding)
}

export function useCloneChildWithPadding (children: ReactNode, extraPadding: ExtraPadding) {
  return useMemo(() => cloneChildWithPadding(children, extraPadding), [children, extraPadding])
}

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

import { ReactNode, useMemo, cloneElement, Children, ReactElement, FC } from 'react'

import { makeCssCalcExpression } from '../utils/makeCssCalcExpression'
import { Position, ADORNMENT_DISPLAY_NAME } from './Adornment'
import { isReactElement } from '../utils/isReactElement'

export interface ExtraPadding {
  [Position.LEFT]?: string | number
  [Position.RIGHT]?: string | number
}

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

  return cloneAndAddPadding(child, extraPadding)
}

export function useCloneChildWithPadding (children: ReactNode, extraPadding: ExtraPadding) {
  return useMemo(() => cloneChildWithPadding(children, extraPadding), [children, extraPadding])
}

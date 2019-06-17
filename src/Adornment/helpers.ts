import { ReactNode, useMemo, cloneElement, Children, ReactElement, FC } from 'react'

import { makeCssCalcExpression } from '../utils/makeCssCalcExpression'
import { isReactElement } from '../utils/isReactElement'

export enum Position {
  LEFT = 'Left',
  RIGHT = 'Right'
}

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

  if (!isReactElement(child)) throw new Error(`Child of Adornment is not a ReactElement`)

  return cloneAndAddPadding(child, extraPadding)
}

export function useCloneChildWithPadding (children: ReactNode, extraPadding: ExtraPadding) {
  return useMemo(() => cloneChildWithPadding(children, extraPadding), [children, extraPadding])
}

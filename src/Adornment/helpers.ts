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

function cloneChildWithPadding (child: ReactNode, extraPadding: ExtraPadding) {
  if (!isReactElement(child)) throw new Error(`Child of Adornment is not a ReactElement`)

  return cloneAndAddPadding(child, extraPadding)
}

function cloneChildrenWithPadding (children: ReactNode, extraPadding: ExtraPadding) {
  const isArray = Array.isArray(children)
  if (isArray) {
    return Children.map(children, (child) => cloneChildWithPadding(child, extraPadding))
  }

  if (!isArray) {
    return cloneChildWithPadding(children, extraPadding)
  }
}

export function useCloneChildrenWithPadding (children: ReactNode, extraPadding: ExtraPadding) {
  return useMemo(() => cloneChildrenWithPadding(children, extraPadding),
    [children, extraPadding[Position.LEFT], extraPadding[Position.RIGHT]]
  )
}

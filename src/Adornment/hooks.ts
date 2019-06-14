import { ReactNode, useMemo, cloneElement, Children, useState, ReactElement, FC, useRef, useEffect, RefObject } from 'react'

import { makeCssCalcExpression, mergeExtraPadding } from './helpers'
import { ExtraPadding, Position, ADORNMENT_DISPLAY_NAME, EXTRA_PADDING } from './Adornment'
import { isReactElement } from '../utils/isReactElement'

function cloneAndAddPadding (child: ReactElement<any, FC>, extraPadding: ExtraPadding) {
  const style = child.props['style'] || {}

  const paddingRight = style.paddingRight
    ? makeCssCalcExpression(style.paddingRight, extraPadding[Position.RIGHT])
    : extraPadding[Position.RIGHT]

  const paddingLeft = style.paddingLeft
    ? makeCssCalcExpression(style.paddingLeft, extraPadding[Position.LEFT])
    : extraPadding[Position.LEFT]

  return cloneElement(child, {
    style: { ...style, paddingLeft, paddingRight }
  })
}

function cloneAndMergeExtraPadding (child: ReactElement<any, FC>, extraPadding: ExtraPadding) {
  const mergedExtraPadding = child.props[EXTRA_PADDING]
    ? mergeExtraPadding(extraPadding, child.props[EXTRA_PADDING])
    : extraPadding

  return cloneElement(child, {
    [EXTRA_PADDING]: mergedExtraPadding
  })
}

function cloneChildWithPadding (children: ReactNode, extraPadding: ExtraPadding) {
  const child = Children.only(children)

  if (!isReactElement(child)) throw new Error(`Child of ${ADORNMENT_DISPLAY_NAME} is not a ReactElement`)

  if (child.type.displayName === ADORNMENT_DISPLAY_NAME) {
    return cloneAndMergeExtraPadding(child, extraPadding)
  }

  return cloneAndAddPadding(child, extraPadding)
}

export function useCloneChildWithPadding (children: ReactNode, extraPadding: ExtraPadding) {
  return useMemo(() => cloneChildWithPadding(children, extraPadding), [children, extraPadding])
}

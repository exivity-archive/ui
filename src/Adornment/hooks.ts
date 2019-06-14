import { ReactNode, useMemo, cloneElement, Children, useState } from 'react'

import { makeCssCalcStatement, mergeExtraPadding } from './helpers'
import { ExtraPadding, Position, ADORNMENT_DISPLAY_NAME, EXTRA_PADDING } from './Adornment'
import { isReactElement } from '../utils/isReactElement'

export function useAddWidthToPadding (extraPadding: ExtraPadding, position: Position) {
  const [width, setWidth] = useState(0)

  return useMemo(() => {
    const widthPadding = width + 'px'

    const newExtraPadding = width
      ? { ...extraPadding, [position]: makeCssCalcStatement(extraPadding[position], widthPadding) }
      : extraPadding

    return [newExtraPadding, setWidth] as [ExtraPadding, typeof setWidth]
  }, [extraPadding[Position.LEFT], Position.RIGHT, width])
}

function cloneAndAddPadding (child: React.ReactElement<any, React.FunctionComponent<{}>>, extraPadding: ExtraPadding) {
  const style = child.props['style'] || {}

  return cloneElement(child, {
    style: {
      ...style,
      paddingLeft: extraPadding[Position.LEFT],
      paddingRight: extraPadding[Position.RIGHT]
    }
  })
}

function cloneAndMergeExtraPadding (child: React.ReactElement<any, React.FunctionComponent<{}>>, extraPadding: ExtraPadding) {
  const mergedExtraPadding = child.props[EXTRA_PADDING]
    ? mergeExtraPadding(extraPadding, child.props[EXTRA_PADDING])
    : extraPadding

  return cloneElement(child, {
    [EXTRA_PADDING]: mergedExtraPadding
  })
}

function cloneChildWithPadding (children: ReactNode, extraPadding: ExtraPadding) {
  const child = Children.only(children)

  if (!isReactElement(child)) return child

  if (child.type.displayName === ADORNMENT_DISPLAY_NAME) {
    return cloneAndMergeExtraPadding(child, extraPadding)
  }

  return cloneAndAddPadding(child, extraPadding)
}

export function useCloneChildWithPadding (children: ReactNode, extraPadding: ExtraPadding) {
  return useMemo(() => cloneChildWithPadding(children, extraPadding), [children, extraPadding])
}

import { ReactNode, useMemo, cloneElement, Children, useState } from 'react'

import { makeCssCalcString, mergeExtraPadding } from './helpers'
import { ExtraPadding, Position, ADORNMENT_DISPLAY_NAME, EXTRA_PADDING } from './Adornment'
import { isElement } from '../utils/isReactElement'

export function useAddWidthToPadding (extraPadding: ExtraPadding, position: Position) {
  const [width, setWidth] = useState(0)

  return useMemo(() => {
    const widthPadding = width + 'px'

    const newExtraPadding = {
      ...extraPadding,
      [position]: makeCssCalcString(widthPadding, extraPadding[position])
    }

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
  return cloneElement(child, {
    [EXTRA_PADDING]: mergeExtraPadding(extraPadding, child.props[EXTRA_PADDING])
  })
}

function cloneElementsWithPadding (children: ReactNode, extraPadding: ExtraPadding) {
  return Children.map(children, (child) => {
    if (!isElement(child)) return child

    if (child.type.displayName === ADORNMENT_DISPLAY_NAME) {
      return cloneAndMergeExtraPadding(child, extraPadding)
    }

    return cloneAndAddPadding(child, extraPadding)
  })
}

export function useCloneElementsWithPadding (children: ReactNode, extraPadding: ExtraPadding) {
  return useMemo(() => cloneElementsWithPadding(children, extraPadding), [children, extraPadding])
}

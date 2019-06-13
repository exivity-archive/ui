import { ReactNode, useState, useMemo, cloneElement, Children } from 'react'

import { PaddingForChild, Position, ADORNMENT_DISPLAY_NAME, PADDING_FOR_CHILD } from './Adornment'
import { isElement } from '../utils/isReactElement'
import { makeCssCalcString, mergePaddingForChild } from './helpers'

export function useOverwriteChildrenPadding (children: ReactNode, position: Position, { ...paddingForChild }: PaddingForChild) {
  const [adornmentWidth, setAdornmentWidth] = useState(0)

  const callback = useMemo(() => {
    return (child: ReactNode) => {
      if (!isElement(child)) return child

      const adornmentPadding = adornmentWidth + 'px'
      paddingForChild[position] = makeCssCalcString(adornmentPadding, paddingForChild[position])

      if (child.type.displayName === ADORNMENT_DISPLAY_NAME) {
        return cloneElement(child, { [PADDING_FOR_CHILD]: mergePaddingForChild(paddingForChild, child.props[PADDING_FOR_CHILD]) })
      }

      return cloneElement(child, {
        style: {
          paddingLeft: paddingForChild[Position.LEFT],
          paddingRight: paddingForChild[Position.RIGHT]
        }
      })
    }
  }, [adornmentWidth, paddingForChild[Position.RIGHT], paddingForChild[Position.LEFT]])

  const newChildren = useMemo(() => Children.map(children, callback), [children, callback])

  return [newChildren, setAdornmentWidth] as [typeof newChildren, typeof setAdornmentWidth]
}

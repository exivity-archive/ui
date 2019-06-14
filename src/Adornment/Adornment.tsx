import React, { ReactNode, useRef, useMemo } from 'react'

import { AdornmentWrapper, StyledAdornment } from './styled'
import { useCloneChildWithPadding } from './hooks'
import { makeCssCalcExpression } from './helpers'

export enum Position {
  LEFT = 'Left',
  RIGHT = 'Right'
}

export const ADORNMENT_DISPLAY_NAME = 'Adornment'
export const EXTRA_PADDING = 'extraPadding'

export interface ExtraPadding {
  [Position.LEFT]: string | number
  [Position.RIGHT]: string | number
}

type AdornmentProps = {
  children: ReactNode
  component: ReactNode

  position?: Position
  [EXTRA_PADDING]?: ExtraPadding
}

export const Adornment = ({
  component,
  position = Position.LEFT,
  children,
  [EXTRA_PADDING]: extraPadding = { [Position.RIGHT]: 0, [Position.LEFT]: 0 }
}: AdornmentProps) => {

  const ref = useRef<HTMLElement>(null)

  const extraPaddingWithWidth = useMemo(() => {
    const width = ref.current
      ? ref.current.getBoundingClientRect().width
      : 0

    return width
      ? { ...extraPadding, [position]: makeCssCalcExpression(extraPadding[position], width) }
      : extraPadding
  }, [extraPadding[Position.LEFT], extraPadding[Position.RIGHT]])

  const child = useCloneChildWithPadding(children, extraPaddingWithWidth)

  return (
    <AdornmentWrapper>
      {child}
      <StyledAdornment
        id='styledAdornment'
        ref={ref}
        position={position}>
        {component}
      </StyledAdornment>
    </AdornmentWrapper>
  )
}

Adornment.displayName = ADORNMENT_DISPLAY_NAME

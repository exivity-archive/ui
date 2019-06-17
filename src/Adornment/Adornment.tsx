import React, { ReactNode, useRef, RefObject, useEffect, useMemo, useState } from 'react'

import { AdornmentWrapper, StyledAdornment } from './styled'
import { useCloneChildWithPadding } from './hooks'
import { getPadding } from './helpers'

export enum Position {
  LEFT = 'Left',
  RIGHT = 'Right'
}

export const ADORNMENT_DISPLAY_NAME = 'Adornment'
export const EXTRA_PADDING = 'extraPadding'

export interface ExtraPadding {
  [Position.LEFT]?: string | number
  [Position.RIGHT]?: string | number
}

type AdornmentProps = {
  children: ReactNode

  leftComponent?: ReactNode
  rightComponent?: ReactNode
  inset?: number
}

export const Adornment = ({
  leftComponent,
  rightComponent,
  children,
  inset = 10
}: AdornmentProps) => {

  const leftRef = useRef<HTMLElement>(null)
  const rightRef = useRef<HTMLElement>(null)

  const [leftPadding, setLeftPadding] = useState<string>()
  const [rightPadding, setRightPadding] = useState<string>()

  useEffect(() => setLeftPadding(getPadding(leftRef, inset)), [leftRef.current, inset])
  useEffect(() => setRightPadding(getPadding(rightRef, inset)), [rightRef.current, inset])

  const child = useCloneChildWithPadding(children, { [Position.LEFT]: leftPadding, [Position.RIGHT]: rightPadding })

  return (
    <AdornmentWrapper>
      {child}
      <StyledAdornment ref={leftRef} inset={inset} position={Position.LEFT}>
        {leftComponent}
      </StyledAdornment>
      <StyledAdornment ref={rightRef} inset={inset} position={Position.RIGHT}>
        {rightComponent}
      </StyledAdornment>
    </AdornmentWrapper>
  )
}

Adornment.displayName = ADORNMENT_DISPLAY_NAME

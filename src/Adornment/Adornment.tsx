import React, { ReactNode } from 'react'

import { AdornmentWrapper, StyledAdornment } from './styled'
import { useCloneChildWithPadding } from './useCloneChildWithPadding'
import { useDynamicCssLengthValue } from '../useDynamicCssLengthValue'

export enum Position {
  LEFT = 'Left',
  RIGHT = 'Right'
}

export const ADORNMENT_DISPLAY_NAME = 'Adornment'
export const EXTRA_PADDING = 'extraPadding'

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

  const [leftPadding, leftRef] = useDynamicCssLengthValue(inset, 'width')
  const [rightPadding, rightRef] = useDynamicCssLengthValue(inset, 'width')

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

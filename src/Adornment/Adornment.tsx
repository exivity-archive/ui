import React, { ReactNode } from 'react'

import { AdornmentWrapper, StyledAdornment } from './styled'
import { useCloneChildWithPadding, Position } from './helpers'
import { useDynamicCssLengthValue } from '../useDynamicCssLengthValue'

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

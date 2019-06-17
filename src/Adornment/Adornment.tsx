import React, { ReactNode, cloneElement, RefObject } from 'react'

import { AdornmentWrapper, StyledAdornment } from './styled'
import { useRefDependentCssLengthValue } from '../useRefDependentCssLengthValue'
import { isReactElement } from '../utils/isReactElement'

export enum Position {
  LEFT = 'Left',
  RIGHT = 'Right'
}

type AdornmentProps = {
  children: ReactNode

  leftComponent?: ReactNode
  rightComponent?: ReactNode
  inset?: number
}

function tryGetRectWidth (ref: RefObject<HTMLElement>) {
  if (ref.current) {
    return ref.current.getBoundingClientRect().width
  }
}

export const Adornment = ({
  leftComponent,
  rightComponent,
  children,
  inset = 10
}: AdornmentProps) => {

  const [paddingLeft, leftRef] = useRefDependentCssLengthValue({ baseValue: inset, refAccessor: tryGetRectWidth })
  const [paddingRight, rightRef] = useRefDependentCssLengthValue({ baseValue: inset, refAccessor: tryGetRectWidth })

  const clonedChild = isReactElement(children)
    && cloneElement(children, {
      ...children.props,
      style: {
        paddingRight,
        paddingLeft,
        ...(children.props.style || {})
      }
    })

  return (
    <AdornmentWrapper data-test='adornment-wrapper'>
      {clonedChild}
      <StyledAdornment ref={leftRef} inset={inset} position={Position.LEFT} data-test='left-adornment'>
        {leftComponent}
      </StyledAdornment>
      <StyledAdornment ref={rightRef} inset={inset} position={Position.RIGHT} data-test='right-adornment'>
        {rightComponent}
      </StyledAdornment>
    </AdornmentWrapper>
  )
}

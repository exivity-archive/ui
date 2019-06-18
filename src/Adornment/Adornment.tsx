import React, { ReactNode, cloneElement } from 'react'

import { AdornmentWrapper, StyledAdornment } from './styled'
import { isReactElement } from '../utils/isReactElement'
import { useClientRect } from '../useClientRect'
import { BlockProps } from '../Block'

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
  inset = 10,
  ...blockProps
}: AdornmentProps & BlockProps) => {

  const [leftRect, leftRef] = useClientRect()
  const [rightRect, rightRef] = useClientRect()

  const paddingLeft = leftRect ? (leftRect.width + inset) : 0
  const paddingRight = rightRect ? (rightRect.width + inset) : 0

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
    <AdornmentWrapper {...blockProps} data-test='adornment-wrapper'>
      {clonedChild}
      <StyledAdornment ref={leftRef} inset={inset} position='left' data-test='left-adornment'>
        {leftComponent}
      </StyledAdornment>
      <StyledAdornment ref={rightRef} inset={inset} position='right' data-test='right-adornment'>
        {rightComponent}
      </StyledAdornment>
    </AdornmentWrapper>
  )
}

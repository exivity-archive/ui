import React, { FC, Dispatch, RefObject, useRef, useEffect } from 'react'

import { StyledAdornmentProps, StyledAdornment } from './styled'
import { Position } from './Adornment'

interface AdornmentContainer extends StyledAdornmentProps {
  registerPosition: Dispatch<number>
  wrapperRef: RefObject<HTMLDivElement>
}

export const AdornmentContainer: FC<AdornmentContainer> = ({ registerPosition, wrapperRef, children, position, ...rest }) => {
  const adornmentRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (adornmentRef.current && wrapperRef.current) {

      const rect = adornmentRef.current.getBoundingClientRect()
      const containerRect = wrapperRef.current.getBoundingClientRect()

      const offset = position === Position.LEFT
        ? rect.left - containerRect.left
        : rect.right - containerRect.right

      registerPosition(rect.width + offset + 5)
    }
  }, [adornmentRef.current, wrapperRef.current])

  return (
    <StyledAdornment
      ref={adornmentRef}
      position={position}
      {...rest}>
      {children}
    </StyledAdornment>
  )
}

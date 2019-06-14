import React, { FC, Dispatch, useRef, useEffect } from 'react'

import { StyledAdornmentProps, StyledAdornment } from './styled'

interface AdornmentContainer extends StyledAdornmentProps {
  registerWidth: Dispatch<number>
}

export const AdornmentContainer: FC<AdornmentContainer> = ({ registerWidth, children, position, ...rest }) => {
  const adornmentRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (adornmentRef.current) {
      const rect = adornmentRef.current.getBoundingClientRect()
      registerWidth(rect.width + 10)
    }
  }, [adornmentRef.current])

  return (
    <StyledAdornment
      id='styledAdornment'
      ref={adornmentRef}
      position={position}
      {...rest}>
      {children}
    </StyledAdornment>
  )
}

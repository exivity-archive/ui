import React from 'react'
import styled from 'styled-components'

import { useOutsideClickListener } from '../useOutsideClickListener/useOutsideClickListener'

export interface OutsideClickListenerProps {
  onOutsideClick?: () => void
}

const defaultFn = () => ({})

const StyledDiv = styled.div`
  display: block;
`

export const OutsideClickListener: React.FC<OutsideClickListenerProps> = ({
  onOutsideClick = defaultFn,
  children
}) => {
  const myRef = useOutsideClickListener(onOutsideClick)

  return (
    <StyledDiv ref={myRef}>
      {children}
    </StyledDiv>
  )
}

import React, { ReactNode, CSSProperties } from 'react'
import styled from 'styled-components';

enum Position {
  LEFT = 'left',
  RIGHT = 'right'
}

interface AdornmentProps {
  component: ReactNode
  position?: Position
  style?: CSSProperties
  children: ReactNode
}

export const Adornment = ({ component, position = Position.LEFT, style, children }: AdornmentProps) => {
  return (
    <AdornmentContainer>
      <StyledAdornment position={position}>{component}</StyledAdornment>
      {children}
    </AdornmentContainer>
  )
}

const StyledAdornment = styled.div<{ position: Position }>`
  position: absolute;
  ${props => `${props.position}: 0;`}
`

const AdornmentContainer = styled.div`
  position: relative;
`
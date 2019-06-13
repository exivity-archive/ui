import React, { ReactNode, useRef } from 'react'

import { AdornmentWrapper } from './styled'
import { AdornmentContainer } from './AdornmentContainer'
import { useOverwriteChildrenPadding } from './useOverwriteChildrenPadding'

export enum Position {
  LEFT = 'Left',
  RIGHT = 'Right'
}

export const ADORNMENT_DISPLAY_NAME = 'Adornment'
export const PADDING_FOR_CHILD = 'paddingForChild'

export interface PaddingForChild {
  [Position.LEFT]: string
  [Position.RIGHT]: string
}

type AdornmentProps = {
  component: ReactNode
  position?: Position
  [PADDING_FOR_CHILD]?: PaddingForChild
  children: ReactNode
  hasParentAdornment?: boolean
}

export const Adornment = ({
  component,
  position = Position.LEFT,
  children,
  hasParentAdornment,
  [PADDING_FOR_CHILD]: paddingForChild = { [Position.RIGHT]: '0px', [Position.LEFT]: '0px' }
}: AdornmentProps) => {

  const wrapperRef = useRef<HTMLDivElement>(null)

  const [newChildren, setAdornmentWidth] = useOverwriteChildrenPadding(children, position, paddingForChild)

  return (
    <AdornmentWrapper ref={wrapperRef} hasParentAdornment={hasParentAdornment}>
      {newChildren}
      <AdornmentContainer
        position={position}
        registerPosition={setAdornmentWidth}
        wrapperRef={wrapperRef}>
        {component}
      </AdornmentContainer>
    </AdornmentWrapper>
  )
}

Adornment.displayName = ADORNMENT_DISPLAY_NAME

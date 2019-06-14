import React, { ReactNode } from 'react'

import { AdornmentWrapper } from './styled'
import { AdornmentContainer } from './AdornmentContainer'
import { useAddWidthToPadding, useCloneChildWithPadding } from './hooks'

export enum Position {
  LEFT = 'Left',
  RIGHT = 'Right'
}

export const ADORNMENT_DISPLAY_NAME = 'Adornment'
export const EXTRA_PADDING = 'extraPadding'

export interface ExtraPadding {
  [Position.LEFT]: string | number
  [Position.RIGHT]: string | number
}

type AdornmentProps = {
  children: ReactNode
  component: ReactNode

  position?: Position
  [EXTRA_PADDING]?: ExtraPadding
}

export const Adornment = ({
  component,
  position = Position.LEFT,
  children,
  [EXTRA_PADDING]: extraPadding = { [Position.RIGHT]: '0px', [Position.LEFT]: '0px' }
}: AdornmentProps) => {

  const [extraPaddingWithWidth, setWidth] = useAddWidthToPadding(extraPadding, position)
  const child = useCloneChildWithPadding(children, extraPaddingWithWidth)

  return (
    <AdornmentWrapper>
      {child}
      <AdornmentContainer
        position={position}
        registerWidth={setWidth}>
        {component}
      </AdornmentContainer>
    </AdornmentWrapper>
  )
}

Adornment.displayName = ADORNMENT_DISPLAY_NAME

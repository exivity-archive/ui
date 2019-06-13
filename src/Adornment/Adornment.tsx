import React, { ReactNode } from 'react'

import { AdornmentWrapper } from './styled'
import { AdornmentContainer } from './AdornmentContainer'
import { useAddWidthToPadding, useCloneElementsWithPadding } from './hooks'

export enum Position {
  LEFT = 'Left',
  RIGHT = 'Right'
}

export const ADORNMENT_DISPLAY_NAME = 'Adornment'
export const EXTRA_PADDING = 'extraPadding'

export interface ExtraPadding {
  [Position.LEFT]: string
  [Position.RIGHT]: string
}

type AdornmentProps = {
  component: ReactNode
  position?: Position
  [EXTRA_PADDING]?: ExtraPadding
  children: ReactNode
  hasParentAdornment?: boolean
}

export const Adornment = ({
  component,
  position = Position.LEFT,
  children,
  hasParentAdornment,
  [EXTRA_PADDING]: extraPadding = { [Position.RIGHT]: '0px', [Position.LEFT]: '0px' }
}: AdornmentProps) => {

  const [extraPaddingWithWidth, setWidth] = useAddWidthToPadding(extraPadding, position)
  const newChildren = useCloneElementsWithPadding(children, extraPaddingWithWidth)

  return (
    <AdornmentWrapper id='adornmentWrapper' hasParentAdornment={hasParentAdornment}>
      {newChildren}
      <AdornmentContainer
        position={position}
        registerWidth={setWidth}>
        {component}
      </AdornmentContainer>
    </AdornmentWrapper>
  )
}

Adornment.displayName = ADORNMENT_DISPLAY_NAME

import React, { forwardRef, Ref, ReactNode } from 'react'

import { Block, BlockProps } from '../Block'

import { handleKeyDownFocusListItem } from './helpers'

export const ListFocus = forwardRef(
  ({ children, ...rest }: BlockProps & { children: ReactNode }, ref: Ref<HTMLDivElement>) => (
    <Block ref={ref} onKeyDown={handleKeyDownFocusListItem} {...rest}>
      {children}
    </Block>
  )
)

import React, { forwardRef, Ref, ReactNode } from 'react'

import { handleKeyDownFocusListItem } from './helpers'

import { Block, BlockProps } from '../Block'

export const ListFocus = forwardRef(({ children, ...rest }: BlockProps & { children: ReactNode }, ref: Ref<HTMLDivElement>) => (
  <Block ref={ref} onKeyDown={handleKeyDownFocusListItem} {...rest}>
    {children}
  </Block>
))

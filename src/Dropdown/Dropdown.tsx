import React from 'react'

import { BlockProps } from '../Block'

import { Content } from './styles'
import { Popper, PopperProps, Placement } from './Popper'

export const DropdownPlacement = Placement

export interface DropdownProps extends Pick<PopperProps, 'open' | 'placement' | 'onOutsideClick' | 'flip'> {
  children: React.ReactNode
  trigger: React.ReactNode
  useTriggerWidth?: boolean
}

export function Dropdown ({
  trigger,
  open,
  flip,
  children,
  useTriggerWidth = false,
  placement,
  onOutsideClick,
  ...blockProps
}: DropdownProps & BlockProps) {
  return (
    <Popper
      renderTrigger={({ ref }) => (
        <div ref={ref}>{trigger}</div>
      )}
      open={open}
      flip={flip}
      placement={placement}
      onOutsideClick={onOutsideClick}
    >
      {({ ref, style, placement }) => (
        <Content
          {...blockProps}
          ref={ref as any}
          style={style}
          data-placement={placement}
          fullWidth={useTriggerWidth}
        >
          {children}
        </Content>
      )}
    </Popper>
  )
}

Dropdown.Content = Content

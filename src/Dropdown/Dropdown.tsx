import React from 'react'

import { BlockProps } from '../Block'

import { Content } from './styles'
import { Popper, PopperProps, Placement } from './Popper'

export const DropdownPlacement = Placement

export interface DropdownProps<T> extends Pick<PopperProps, 'open' | 'placement' | 'onOutsideClick' | 'flip'> {
  children: React.ReactNode
  useTriggerWidth?: boolean
  TriggerComponent: React.ComponentType<T & { ref: React.Ref<any>, onClick?: () => void }>
  triggerComponentProps?: T
  onClick?: () => void
}

export function Dropdown <T extends {}> ({
  TriggerComponent,
  triggerComponentProps = {} as T,
  open,
  flip,
  children,
  useTriggerWidth = false,
  placement,
  onOutsideClick,
  onClick,
  ...blockProps
}: DropdownProps<T> & BlockProps) {
  return (
    <Popper
      renderTrigger={({ ref }) => (
        <TriggerComponent onClick={onClick} {...triggerComponentProps} ref={ref} />
      )}
      open={open}
      flip={flip}
      placement={placement}
      onOutsideClick={onOutsideClick}
    >
      {({ ref, style, placement }) => (
        <Content
          ref={ref as any}
          style={style}
          data-placement={placement}
          fullWidth={useTriggerWidth}
          {...blockProps}
        >
          {children}
        </Content>
      )}
    </Popper>
  )
}

Dropdown.Content = Content

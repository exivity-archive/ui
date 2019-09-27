import React, { FC } from 'react'

import { BlockProps } from '../Block'

import { Content } from './styles'
import { Popper, PopperProps } from './Popper'

export { Placement as DropdownPlacement } from './Popper'

export interface DropdownProps extends Pick<PopperProps, 'open' | 'renderTrigger' | 'placement' | 'onOutsideClick' | 'flip'> {
  children: React.ReactNode
  useTriggerWidth?: boolean
  test?: string
}

export const Dropdown: FC<DropdownProps & BlockProps> & { Content: typeof Content } = ({
  renderTrigger,
  open,
  flip,
  children,
  useTriggerWidth = false,
  placement,
  onOutsideClick,
  test = 'dropdown',
  ...blockProps
}) => (
  <Popper
    renderTrigger={renderTrigger}
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
        data-test={`${test}-content`}
        fullWidth={useTriggerWidth}
        {...blockProps}
      >
        {children}
      </Content>
    )}
  </Popper>
)

Dropdown.Content = Content

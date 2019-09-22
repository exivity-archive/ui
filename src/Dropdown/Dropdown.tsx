import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { Manager, Reference, Popper } from 'react-popper'

import { OutsideClickListener } from '../OutsideClickListener'
import { Block, BlockProps } from '../Block'

import { fromTheme } from '../utils/styled'

const Container = styled.div`
  position: relative;
`

const Content = styled(Block)<{ fullWidth: boolean }>`
  background-color: #f9f9f9;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  min-width: ${({ fullWidth }) => fullWidth ? '100%' : '160px'};
  z-index: ${fromTheme(theme => theme.global.zPriority.foreground)};
`

export interface DropdownProps extends BlockProps {
  renderTrigger: (props: { ref: React.Ref<HTMLElement> }) => React.ReactNode
  open: boolean
  children: ReactElement
  useTriggerWidth?: boolean
  placement?: Placement
  onOutsideClick?: (...rest: any) => void
  test?: string
}

/**
 * Placement options for Popper
 * @see https://popper.js.org/popper-documentation.html#Popper.placements
 */
export enum Placement {
  RIGHT = 'right',
  RIGHT_START = 'right-start',
  RIGHT_END = 'right-end',
  LEFT = 'left',
  LEFT_START = 'left-start',
  LEFT_END = 'left-end',
  TOP = 'top',
  TOP_START = 'top-start',
  TOP_END = 'top-end',
  BOTTOM = 'bottom',
  BOTTOM_START = 'bottom-start',
  BOTTOM_END = 'bottom-end',
  AUTO = 'auto',
  AUTO_START = 'auto-start',
  AUTO_END = 'auto-end'
}

export const Dropdown: React.FC<DropdownProps> & { Content: typeof Content } = ({
  renderTrigger,
  open,
  children,
  useTriggerWidth = false,
  placement = Placement.BOTTOM_END,
  onOutsideClick,
  test = 'dropdown',
  ...blockProps
}) => (
  <Manager>
    <Container>
      <OutsideClickListener onOutsideClick={onOutsideClick}>
        <Reference>{renderTrigger}</Reference>
        {open
          ? (
            <Popper
              placement={placement}
              positionFixed={false}
              modifiers={{ flip: { enabled: true } }}
            >
              {({ ref, style, placement, arrowProps }) => (
                <Content
                  ref={ref}
                  style={style}
                  data-placement={placement}
                  data-test={`${test}-content`}
                  fullWidth={useTriggerWidth}
                  {...blockProps}
                >
                  {children}
                  <div ref={arrowProps.ref} style={arrowProps.style} />
                </Content>
              )}
            </Popper>
          )
          : null
        }
      </OutsideClickListener>
    </Container>
  </Manager>
)

Dropdown.Content = Content

import React from 'react'
import { Manager, Reference, Popper as ReactPopper } from 'react-popper'
import styled from 'styled-components'

import { OutsideClickListener } from '../OutsideClickListener'

export const Container = styled.div`
  position: relative;
`

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

interface TriggerProps {
  ref: React.Ref<HTMLElement>
}

interface ChildProps {
  ref: React.Ref<HTMLElement>
  style: React.CSSProperties
  placement: Placement
  scheduleUpdate: () => void
  arrowProps: {
    ref: React.Ref<HTMLElement>
    style: React.CSSProperties
  }
}

export interface PopperProps {
  renderTrigger: (props: TriggerProps) => React.ReactNode
  open: boolean
  children: (props: ChildProps) => React.ReactNode
  placement?: Placement
  onOutsideClick?: (...rest: any) => void,
  offset?: number,
  flip?: boolean
}

export const Popper: React.FC<PopperProps> = ({
  renderTrigger,
  open,
  children,
  onOutsideClick,
  placement = Placement.BOTTOM_START,
  offset = 0,
  flip = true
}) => (
  <Manager>
    <Container>
      <OutsideClickListener onOutsideClick={onOutsideClick}>
        <Reference>{renderTrigger}</Reference>
        {open
          ? (
            <ReactPopper
              placement={placement}
              positionFixed={false}
              modifiers={{
                flip: { enabled: flip },
                offset: { enabled: offset !== 0, offset: `${offset}, ${offset}` }
              }}
            >
              {({ ref, style, placement: currentPlacement, arrowProps, scheduleUpdate }) =>
                children({
                  ref: ref as React.Ref<HTMLElement>,
                  style,
                  placement: currentPlacement as Placement,
                  arrowProps,
                  scheduleUpdate
                })
              }
            </ReactPopper>
          )
          : null
        }
      </OutsideClickListener>
    </Container>
  </Manager>
)

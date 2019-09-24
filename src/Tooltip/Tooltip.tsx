import React, { FC, useState, useEffect } from 'react'
import useTimeout from '@rooks/use-timeout'

import { BlockProps } from '../Block'
import { Popper, PopperProps, Placement as PopperPlacement } from '../Dropdown/Popper'

export const TooltipPlacement = PopperPlacement

import { TooltipContent, Arrow } from './styles'
import { Flex } from '../Flex'

const TriggerWrapper: FC<any> = (props) => <Flex {...props}/>

export interface TooltipProps extends Pick<PopperProps, 'renderTrigger' | 'placement' | 'onOutsideClick' | 'flip' | 'offset'> {
  children: React.ReactNode
  open?: boolean | null
  defaultOpen?: boolean
  closeTimeout?: number
}

interface Components {
  Content: typeof TooltipContent
  TriggerWrapper: typeof TriggerWrapper
}

export const Tooltip: FC<TooltipProps & BlockProps> & Components = ({
  renderTrigger,
  flip,
  open = null,
  defaultOpen = false,
  offset = 0,
  closeTimeout = 1000,
  children,
  placement = TooltipPlacement.BOTTOM,
  onOutsideClick,
  ...blockProps
}) => {
  const [opened, setOpened] = useState(open === null ? defaultOpen : open)
  useEffect(() => {
    if (open !== null) {
      setOpened(open)
    }
  }, [open])

  const closeTimer = useTimeout(() => setOpened(false), closeTimeout)
  useEffect(closeTimer.clear, [opened, closeTimeout])

  return (
    <Popper
      renderTrigger={(...args) => (
        <TriggerWrapper
          onMouseEnter={() => {
            if (open === null) {
              closeTimer.clear()
              setOpened(true)
            }
          }}
          onMouseLeave={() => {
            if (open === null) {
              closeTimer.start()
            }
          }}
        >
          {renderTrigger(...args)}
        </TriggerWrapper>
      )}
      open={opened}
      flip={flip}
      offset={offset + 8}
      placement={placement}
      onOutsideClick={onOutsideClick && (() => {
        onOutsideClick({
          close: () => {
            if (open === null) {
              setOpened(false)
            }
          }
        })
      })}
    >
      {({ ref, style, placement, arrowProps }) => (
        <TooltipContent
          ref={ref as any}
          style={style}
          data-placement={placement}
          {...blockProps}
        >
          {children}
          <Arrow data-placement={placement} ref={arrowProps.ref as any} style={arrowProps.style}>
            {String.fromCharCode(9660)}
          </Arrow>
        </TooltipContent>
      )}
    </Popper>
  )
}

Tooltip.Content = TooltipContent
Tooltip.TriggerWrapper = TriggerWrapper
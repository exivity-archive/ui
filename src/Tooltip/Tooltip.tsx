import React, { FC, useEffect, useState } from 'react'
import useTimeout from '@rooks/use-timeout'

import { BlockProps } from '../Block'
import { Popper, PopperProps, Placement as PopperPlacement } from '../Dropdown/Popper'
import { Flex } from '../Flex'
import useClosable from '../Dropdown/useClosable'

import { TooltipContent, Arrow } from './styles'

export const TooltipPlacement = PopperPlacement

const TriggerWrapper: FC<any> = React.forwardRef((props, ref) => <Flex {...props} ref={ref}/>)

export interface TooltipProps extends Pick<PopperProps, 'placement' | 'onOutsideClick' | 'flip' | 'offset'> {
  children: React.ReactNode
  content: React.ReactNode
  open?: boolean | null
  defaultOpen?: boolean
  closeTimeout?: number
  onToggle?: (open: boolean) => void
}

export function Tooltip ({
  children,
  content,
  flip,
  open = null,
  defaultOpen = false,
  onToggle = () => null,
  offset = 0,
  closeTimeout = 1000,
  placement = TooltipPlacement.TOP,
  onOutsideClick,
  ...blockProps
}: TooltipProps & BlockProps) {
  const [isMouseOverContent, setMouseOverContent] = useState<boolean>(false)
  const { isOpen, open: setOpen, close } = useClosable(defaultOpen, open, onToggle)
  const closeTimer = useTimeout(() => { if (!isMouseOverContent) close() }, closeTimeout)

  useEffect(closeTimer.clear, [isOpen, closeTimeout])
  useEffect(() => {
    if (!isMouseOverContent && open === null) {
      closeTimer.start()
    }
  }, [isMouseOverContent])

  return (
    <Popper
      renderTrigger={({ ref }) => (
        <TriggerWrapper
          ref={ref}
          onMouseEnter={() => {
            if (open === null) {
              closeTimer.clear()
            }
            setOpen()
          }}
          onMouseLeave={() => {
            if (open === null) {
              closeTimer.start()
            }
          }}
        >
          {children}
        </TriggerWrapper>
      )}
      open={isOpen}
      flip={flip}
      offset={offset + 8}
      placement={placement}
      onOutsideClick={onOutsideClick && (() => {
        onOutsideClick({ close })
      })}
    >
      {({ ref, style, placement, arrowProps }) => {
        return (
          <TooltipContent
            ref={ref as any}
            onMouseEnter={() => { setMouseOverContent(true) }}
            onMouseLeave={() => { setMouseOverContent(false) }}
            style={style}
            data-placement={placement}
            {...blockProps}
          >
            {content}
            <Arrow data-placement={placement} ref={arrowProps.ref as any} style={arrowProps.style}>
              {String.fromCharCode(9660)}
            </Arrow>
          </TooltipContent>
        )
      }}
    </Popper>
  )
}

Tooltip.Content = TooltipContent
Tooltip.TriggerWrapper = TriggerWrapper

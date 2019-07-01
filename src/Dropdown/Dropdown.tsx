import React, { useMemo, cloneElement, isValidElement, ReactElement } from 'react'
import styled, { css } from 'styled-components'

import { OutsideClickListener } from '../OutsideClickListener'
import { Block, BlockProps } from '../Block'

import { makeDefaultCSS } from './helpers'

import { fromTheme } from '../utils/styled'
import { useSnapEdgeToParent, Vertical, Horizontal, BreakDistance } from '../useSnapEdgeToParent'

const StyledDropdown = styled(Block)`
  position: relative;
`

interface ContentProps {
  open: boolean
  triggerWidth?: string
  position?: string | null
}

const Content = styled(Block) <ContentProps>`
  box-sizing: border-box;
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  z-index: ${fromTheme(theme => theme.global.zPriority.background)};

  min-width: 160px;
  ${props => props.triggerWidth && css`
    width: ${props.triggerWidth};
  `}

  visibility: ${({ open }) => open ? 'visible' : 'hidden'};
  ${({ position }) => css`${position}`}
`

export interface DropdownProps extends BlockProps {
  className?: string
  triggerComponent: React.ReactNode
  open: boolean
  vertical?: Vertical
  horizontal?: Horizontal
  breakDistance?: BreakDistance
  useTriggerComponentWidth?: boolean
  onOutsideClick?: (...rest: any) => void
  test?: string
}

export const Dropdown: React.FC<DropdownProps> & { Content: typeof Content } = ({
  className,
  triggerComponent,
  children,
  open,
  horizontal = Horizontal.AUTO,
  vertical = Vertical.AUTO,
  breakDistance = 20,
  useTriggerComponentWidth,
  onOutsideClick,
  test = 'dropdown',
  ...blockProps
}) => {
  const [{ target, parent }, positioning] = useSnapEdgeToParent(breakDistance, { horizontal, vertical })

  const position = useMemo(() => parent.rect && makeDefaultCSS(positioning, parent.rect.height), [positioning])

  const triggerWidth = parent.rect
    ? `${parent.rect.width}px`
    : undefined

  return (
    <StyledDropdown className={className} data-test={test} ref={parent.ref}>
      <OutsideClickListener onOutsideClick={onOutsideClick}>
        {triggerComponent}
        <Content triggerWidth={useTriggerComponentWidth ? triggerWidth : undefined}
          data-test={`${test}-content`}
          ref={target.ref}
          position={position}
          open={open}
          {...blockProps}>
          {isValidElement(children)
            ? cloneElement(children as ReactElement<any>, { ...children.props, positioning })
            : children}
        </Content>
      </OutsideClickListener>
    </StyledDropdown>
  )
}

Dropdown.Content = Content

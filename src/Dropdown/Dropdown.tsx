import React, { useMemo, cloneElement, isValidElement } from 'react'
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
  useTriggerComponentWidth?: boolean
  width?: string
  position?: string
}

const Content = styled(Block) <ContentProps>`
  box-sizing: border-box;
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  z-index: ${fromTheme(theme => theme.global.zPriority.background)};

  min-width: 160px;
  ${props => (props.useTriggerComponentWidth && props.width) && css`
    width: ${props.width};
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

export const Dropdown: React.FC<DropdownProps> = ({
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

  const position = useMemo(() => {
    if (parent.rect && target.rect) {
      return makeDefaultCSS(
        positioning,
        { content: target.rect, trigger: parent.rect }
      )
    }
  }, [positioning])

  const triggerWidth = parent.rect
    ? `${parent.rect.width}px`
    : undefined

  return (
    <StyledDropdown className={className} data-test={test} ref={parent.ref}>
      <OutsideClickListener onOutsideClick={onOutsideClick}>
        {triggerComponent}
        <Content useTriggerComponentWidth={useTriggerComponentWidth}
          width={useTriggerComponentWidth ? triggerWidth : undefined}
          data-test={`${test}-content`}
          ref={target.ref}
          position={position}
          open={open}>
          <Block {...blockProps}>
            {isValidElement(children)
              ? cloneElement(children, { ...children.props, positioning })
              : children }
          </Block>
        </Content>
      </OutsideClickListener>
    </StyledDropdown>
  )
}

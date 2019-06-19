import React, { useEffect, useMemo } from 'react'
import styled, { css } from 'styled-components'

import { OutsideClickListener } from '../OutsideClickListener'
import { Block, BlockProps } from '../Block'

import {
  makeCssPosition
} from './helpers'

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
  z-index: ${fromTheme(theme => theme.global.zPriority.one)};

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
  horizontal = 'auto',
  vertical = 'auto',
  breakDistance = 20,
  useTriggerComponentWidth,
  onOutsideClick,
  test = 'dropdown',
  ...blockProps
}) => {
  const [refs, layout, handleLayout] = useSnapEdgeToParent(breakDistance, { horizontal, vertical })

  useEffect(() => {
    window.addEventListener('resize', handleLayout)
    return () => window.removeEventListener('resize', handleLayout)
  }, [])

  const position = useMemo(() => {
    if (refs.parent.current) {
      return makeCssPosition(layout, refs.parent.current.getBoundingClientRect().height)
    }
  }, [layout])

  const triggerWidth = refs.parent.current
    ? `${refs.parent.current.clientWidth}px`
    : undefined

  return (
    <StyledDropdown className={className} data-test={test} ref={refs.parent}>
      <OutsideClickListener onOutsideClick={onOutsideClick}>
        {triggerComponent}
        <Content useTriggerComponentWidth={useTriggerComponentWidth}
          width={useTriggerComponentWidth ? triggerWidth : undefined}
          data-test={`${test}-content`}
          ref={refs.target}
          position={position}
          open={open}>
          <Block {...blockProps}>
            {children}
          </Block>
        </Content>
      </OutsideClickListener>
    </StyledDropdown>
  )
}

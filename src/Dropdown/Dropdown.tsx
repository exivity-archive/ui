import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

import { OutsideClickListener } from '../OutsideClickListener'
import { Block, BlockProps } from '../Block'

import {
  getPosition,
  Vertical,
  Horizontal,
  Layout,
  Rects,
  makeCssPosition
} from './helpers'

import { fromTheme } from '../utils/styled'

const StyledDropdown = styled.div`
  position: relative;
  width: 100%;
`

interface ContentProps {
  open: boolean
  useTriggerComponentWidth?: boolean
  width?: string
  position: string
}

const Content = styled.div <ContentProps>`
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
  ${({ position }) => `${position}`}
`

export interface DropdownProps extends BlockProps {
  className?: string
  triggerComponent: React.ReactNode
  open: boolean
  vertical?: Vertical
  horizontal?: Horizontal
  breakDistance?: number
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
  const dropdownRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<string>('')

  const handlePosition = () => {
    if (dropdownRef.current && contentRef.current) {
      const layout: Layout = { horizontal, vertical }
      const rects: Rects = {
        inner: contentRef.current.getBoundingClientRect(),
        outer: dropdownRef.current.getBoundingClientRect()
      }
      const position = getPosition(rects, layout, breakDistance)
      setPosition(makeCssPosition(position))
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handlePosition)
    return () => window.removeEventListener('resize', handlePosition)
  }, [])

  useLayoutEffect(handlePosition, [])

  const triggerWidth = dropdownRef.current
    ? `${dropdownRef.current.clientWidth}px`
    : undefined

  return (
    <StyledDropdown className={className} data-test={test} ref={dropdownRef}>
      <OutsideClickListener onOutsideClick={onOutsideClick}>
        {triggerComponent}
        <Content useTriggerComponentWidth={useTriggerComponentWidth}
          width={useTriggerComponentWidth ? triggerWidth : undefined}
          data-test='dropdown-content'
          ref={contentRef}
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

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

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
  z-index: ${fromTheme(theme => theme.global.priority.one)};

  min-width: 160px;
  ${props => (props.useTriggerComponentWidth && props.width) && css`
    width: ${props.width};
  `}

  visibility: ${({ open }) => open ? 'visible' : 'hidden'};
  ${({ position }) => `${position}`}
`

interface DropdownProps {
  className?: string
  triggerComponent: React.ReactNode
  open: boolean
  vertical?: Vertical
  horizontal?: Horizontal
  breakDistance?: number
  useTriggerComponentWidth?: boolean
}

export const Dropdown: React.FC<DropdownProps> = ({
  className,
  triggerComponent,
  children,
  open,
  horizontal = 'auto',
  vertical = 'auto',
  breakDistance = 20,
  useTriggerComponentWidth
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
  const width = dropdownRef.current
    ? `${dropdownRef.current.clientWidth}px`
    : undefined

  return (
    <StyledDropdown className={className} data-test='dropdown' ref={dropdownRef}>
      {triggerComponent}
      <Content useTriggerComponentWidth={useTriggerComponentWidth}
        width={width}
        data-test='dropdown-content'
        ref={contentRef}
        position={position}
        open={open}>
        {children}
      </ Content>
    </StyledDropdown>
  )
}

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { getPosition, Vertical, Horizontal, Refs, Layout } from './helpers'

const StyledDropdown = styled.div`
  position: relative;
`

interface Position {
  left?: 0
  right?: 0
  top?: number
  bottom?: number
}

interface ContentProps extends Position {
  open: boolean
  useTriggerComponentWidth?: boolean
  width?: string
}

const Content = styled.div <ContentProps>`
  box-sizing: border-box;
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  padding: 20px;

  min-width: 160px;
  ${props => (props.useTriggerComponentWidth && props.width) && css`
    width: ${props.width};
  `}

  visibility: ${({ open }) => open ? 'visible' : 'hidden'};
  ${({ left, right, top, bottom }) => css`
    ${left !== undefined && css`
      left: ${left};
    `}
    ${right !== undefined && css`
      right: ${right};
    `}
    ${top !== undefined && css`
      top: ${top}px;
      margin-top: 5px;
    `}
    ${bottom !== undefined && css`
      bottom: ${bottom}px;
      margin-bottom: 5px;
    `}
  `}
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
  const [position, setPosition] = useState<Position>({})
  const refs: Refs = {
    dropdown: useRef<HTMLDivElement>(null),
    content: useRef<HTMLDivElement>(null)
  }

  const layout: Layout = { horizontal, vertical }

  const handlePosition = () => {
    const newPosition = getPosition(refs, layout, breakDistance)
    if (newPosition) {
      setPosition(newPosition)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handlePosition)
    return () => window.removeEventListener('resize', handlePosition)
  }, [])

  useLayoutEffect(handlePosition, [])
  const width = refs.dropdown.current
    ? `${refs.dropdown.current.clientWidth}px`
    : undefined

  return (
    <StyledDropdown className={className} data-test='dropdown' ref={refs.dropdown}>
      {triggerComponent}
      <Content useTriggerComponentWidth={useTriggerComponentWidth}
        width={width}
        data-test='dropdown-content'
        ref={refs.content}
        {...position}
        open={open}>
        {children}
      </ Content>
    </StyledDropdown>
  )
}

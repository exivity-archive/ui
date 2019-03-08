import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

interface IPosition {
  left?: 0
  right?: 0
  top?: number
  bottom?: number
}

interface IContentProps extends IPosition {
  open: boolean
  useTriggerComponentWidth?: boolean
  width?: string
}

const Content = styled.div <IContentProps>`
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
    ${typeof left !== 'undefined' && css`
      left: ${left};
    `}
    ${typeof right !== 'undefined' && css`
      right: ${right};
    `}
    ${typeof top !== 'undefined' && css`
      top: ${top}px;
      margin-top: 5px;
    `}
    ${typeof bottom !== 'undefined' && css`
      bottom: ${bottom}px;
      margin-bottom: 5px;
    `}
  `}
`

type Vertical = 'top' | 'bottom' | 'auto'
type Horizontal = 'left' | 'right' | 'auto'

interface IDropdownProps {
  className?: string
  triggerComponent: React.ReactNode
  open: boolean
  vertical?: Vertical
  horizontal?: Horizontal
  breakDistance?: number
  useTriggerComponentWidth?: boolean
}

interface ILayout {
  horizontal: Horizontal
  vertical: Vertical,
}

const elementCrossedEdge = (absolutePosition: number, elementDimension: number, edge: number) => {
  return absolutePosition + elementDimension > edge
}

const PlainDropdown: React.FC<IDropdownProps> = ({
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
  const dropdownContentRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<IPosition>({})

  const handlePosition = () => {
    if (!dropdownContentRef.current || !dropdownRef.current) return

    const outer = dropdownRef.current.getBoundingClientRect()
    const inner = dropdownContentRef.current.getBoundingClientRect()

    const layout: Partial<ILayout> = { horizontal, vertical }

    if (vertical === 'auto') {
      layout.vertical = elementCrossedEdge(outer.bottom, inner.height, window.innerHeight - breakDistance)
        ? 'top' : 'bottom'
    }

    if (horizontal === 'auto') {
      layout.horizontal = elementCrossedEdge(outer.left, inner.width, window.innerWidth - breakDistance)
        ? 'left' : 'right'
    }

    if (vertical === 'auto' || horizontal === 'auto') {
      setPosition({
        [layout.horizontal === 'left' ? 'right' : 'left']: 0,
        [layout.vertical === 'top' ? 'bottom' : 'top']: outer.height
      })
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
    <div className={className} data-test='dropdown' ref={dropdownRef}>
      {triggerComponent}
      <Content useTriggerComponentWidth={useTriggerComponentWidth} width={width}
        data-test='dropdown-content'
        ref={dropdownContentRef}
        {...position}
        open={open}>
        {children}
      </ Content>
    </div>
  )
}

export const Dropdown = styled(PlainDropdown)`
  position: relative;
`

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
}

const Content = styled.div <IContentProps>`
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  padding: 20px;
  padding-right: 10%;
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
  button: React.ReactNode
  open: boolean
  vertical?: Vertical
  horizontal?: Horizontal
  breakDistance: number
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
      button,
      children,
      open,
      horizontal = 'auto',
      vertical = 'auto',
      breakDistance = 20
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

  return (
    <div className={className} data-test='dropdown' ref={dropdownRef}>
      {button}
      <Content
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

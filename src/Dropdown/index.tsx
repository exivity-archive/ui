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

const Content = styled.div<IContentProps>`
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
}

interface ILayout {
  horizontal: Horizontal
  vertical: Vertical,
}

const Dropdown: React.FC<IDropdownProps> = ({
  className,
  button,
  children,
  open,
  vertical = 'auto',
  horizontal = 'auto'
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dropdownContentRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<IPosition>({})

  const handlePosition = () => {
    if ((vertical === 'auto' || horizontal === 'auto') && dropdownContentRef.current && dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect()
      const dropdownContentRect = dropdownContentRef.current.getBoundingClientRect()

      const breakDistance = 20
      const layout: Partial<ILayout> = {}

      if (vertical === 'auto') {
        const closeToBottomBound = dropdownRect.bottom + dropdownContentRect.height > window.innerHeight - breakDistance
        layout.vertical = closeToBottomBound ? 'top' : 'bottom'
      } else {
        layout.vertical = vertical
      }
      if (horizontal === 'auto') {
        const closeToRightBound = dropdownRect.left + dropdownContentRect.width > window.innerWidth - breakDistance
        layout.horizontal = closeToRightBound ? 'left' : 'right'
      } else {
        layout.horizontal = horizontal
      }

      setPosition({
        [layout.horizontal === 'left' ? 'right' : 'left']: 0,
        [layout.vertical === 'top' ? 'bottom' : 'top']: dropdownRect.height
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

export default styled(Dropdown)`
  position: relative;
`

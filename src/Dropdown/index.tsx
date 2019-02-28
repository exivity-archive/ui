import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import styled, { css } from 'styled-components';

interface IContentPosition {
  left?: 0
  right?: 0
  top?: string | 0
  bottom?: string | 0
}

interface IContentProps extends IContentPosition {
  opened: boolean
}

const Content = styled.div<IContentProps>`
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  padding: 20px;
  padding-right: 10%;
  visibility: ${({ opened }) => opened ? 'visible' : 'hidden'};
  ${ ({left, right, top, bottom}) => css`
    ${typeof left !== 'undefined' && css`
      left: ${left};
    `}
    ${typeof right !== 'undefined' && css`
      right: ${right};
    `}
    ${typeof top !== 'undefined' && css`
      top: ${top};
      margin-top: 5px;
    `}
    ${typeof bottom !== 'undefined' && css`
      bottom: ${bottom};
      margin-bottom: 5px;
    `}
  `}
`

type Vertical = 'top' | 'bottom'
type Horizontal = 'left' | 'right'
type Layout = [Vertical, Horizontal] | 'auto'
interface IDropdownProps {
  className?: string
  button: React.ReactNode
  opened: boolean
  layout: Layout
}

const Dropdown: React.FC<IDropdownProps> = ({
  className,
  button,
  children,
  opened,
  layout
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentPosition, setContentPosition] = useState<IContentPosition>({})

  //  set initial position once contentRef.current is defined
  useEffect(() => {
    handleDropdownPosition()
  }, [contentRef.current])

  useEffect(() => {
    window.addEventListener('resize', handleDropdownPosition)  
    return () => window.removeEventListener('resize', handleDropdownPosition)  
  }, [])

  const handleDropdownPosition = () => {
    setContentPosition(getDropdownPosition(layout))
   }

  const getDropdownPosition = (layout: Layout): IContentPosition => {
    if(contentRef.current) {
      const rect = contentRef.current.getBoundingClientRect()
      const parentRect = contentRef.current.parentElement!.getBoundingClientRect()
      

      let horizontal: Horizontal
      let vertical: Vertical

      if (layout === 'auto') {
        const closeToBottomBound = window.innerHeight - 20 < parentRect.bottom + rect.height
        vertical = closeToBottomBound ? 'bottom' : 'top'
        const closeToRightBound = window.innerWidth - 20 < parentRect.left + rect.width 
        horizontal = closeToRightBound ? 'right' : 'left'

      } else {
        vertical = layout[0]
        horizontal = layout[1]
      }

      return {
        [horizontal]: 0,
        [vertical]: `${parentRect.height}px`
      }
    }
    return {}
  }

  return (
    <div className={className}>
      {button}
        <Content 
          ref={contentRef}
          {...contentPosition}
          opened={opened}>

          {children}
        </Content>
    </div>
  )
}

Dropdown.defaultProps = {
  layout: 'auto'
}

export default styled(Dropdown)`
  position: relative;
  display: inline-block;
  margin: 0;
`

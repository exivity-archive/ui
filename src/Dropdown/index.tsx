import React, { useRef, useState, useEffect } from 'react'
import styled, { css } from 'styled-components';

interface IContentPosition {
  left?: 0
  right?: 0
  top?: string | 0
  bottom?: string | 0
}

interface IContentProps {
  position: IContentPosition
}

const Content = styled.div<IContentProps>`
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  padding: 20px;
  padding-right: 10%;
  ${ ({position}) => css`
    ${typeof position.left !== 'undefined' && css`
      left: ${position.left};
    `}
    ${typeof position.right !== 'undefined' && css`
      right: ${position.right};
    `}
    ${typeof position.bottom !== 'undefined' && css`
      bottom: ${position.bottom};
      margin-bottom: 5px;
    `}
    ${typeof position.top !== 'undefined' && css`
      top: ${position.top};
      margin-top: 5px;
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
  const dropdownRef = useRef<HTMLDivElement>(null)
  const getDropdownPosition = (layout: Layout): IContentPosition => {
    if(dropdownRef.current) {
      const drop = dropdownRef.current
      const rect = drop.getBoundingClientRect()
      const parentRect = drop.parentElement!.getBoundingClientRect()
      
      let horizontal: Horizontal
      let vertical: Vertical
      
      if (layout === 'auto') {
        const closeToBottomBound = window.innerHeight - 20 < parentRect.bottom + rect.height
        vertical = !closeToBottomBound ? 'top' : 'bottom'
        const closeToRightBound = window.innerWidth - 20 < parentRect.left + rect.width 
        horizontal = !closeToRightBound ? 'left' : 'right'
      } else {
        vertical = layout[0]
        horizontal = layout[1]
      }
  
      return {
        [horizontal]: 0,
        [vertical]: `${parentRect.height}px`
      }
    }
    return {
      left: 0
    }
  }

  const [contentPosition, setContentPosition] = useState<IContentPosition>({})

  //  set initial position once dropdownRef.current is defined
  useEffect(() => {
    handleDropdownPosition()
  }, [dropdownRef.current])

  useEffect(() => {
    window.addEventListener('resize', handleDropdownPosition)  
    return () => {
      window.removeEventListener('resize', handleDropdownPosition)  
    }
  }, [])

  const handleDropdownPosition = () => {
   setContentPosition(getDropdownPosition(layout))
  }

  return (
    <div className={className}>
      {button}
        <Content 
          ref={dropdownRef}
          position={contentPosition}
          style={{ visibility: opened ? 'visible' : 'hidden' }}
          >
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
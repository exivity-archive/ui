import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import styled, { css } from 'styled-components'

interface IPosition {
  left?: 0
  right?: 0
  top?: number
  bottom?: number
}

interface IContentProps extends IPosition {
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
  ${ ({ left, right, top, bottom }) => css`
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

type Vertical = 'to-top' | 'to-bottom'
type Horizontal = 'to-left' | 'to-right'
interface ILayout {
  horizontal: Horizontal
  vertical: Vertical,
}
interface IDropdownProps {
  className?: string
  button: React.ReactNode
  opened: boolean
  layout?: ILayout | 'auto'
}


const Dropdown: React.FC<IDropdownProps> = ({ 
  className, 
  button, 
  children, 
  opened, 
  layout = 'auto'
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<IPosition | undefined>()

  const getPosition = (layout: ILayout | 'auto') => {
    if (layout !== 'auto' && position !== undefined) {
      return position
    } else if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      const parentRect = ref.current.parentElement!.getBoundingClientRect()
      
      const makePosition = ({ horizontal, vertical }: ILayout): IPosition => ({
        [horizontal === 'to-left' ? 'right' : 'left']: 0,
        [vertical === 'to-top' ? 'bottom' : 'top']: parentRect.height
      })

      if (layout === 'auto') {
        const breakDistance = 20
        const closeToBottomBound = parentRect.bottom + rect.height > window.innerHeight - breakDistance
        const closeToRightBound = parentRect.left + rect.width > window.innerWidth - breakDistance 

        return makePosition({
          vertical: closeToBottomBound ? 'to-top' : 'to-bottom', 
          horizontal: closeToRightBound ? 'to-left' : 'to-right'
        })
      } else {
        return makePosition(layout)

      }
    }
  }

  const handlePosition = () => setPosition(getPosition(layout))

  useEffect(() => {
    window.addEventListener('resize', handlePosition)  
    return () => window.removeEventListener('resize', handlePosition)  
  }, [])

  useLayoutEffect(handlePosition, [])

  return (
    <div className={className} data-test='dropdown'>
      {button}
        <Content 
          data-test='dropdown-content'
          ref={ref}
          {...position}
          opened={opened}>

          {children}
        </ Content>
    </div>
  )
}

export default styled(Dropdown)`
  position: relative;
`
